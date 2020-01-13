import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, inject, observable} from 'aurelia-framework';

import {DataModels} from '@process-engine/management_api_contracts';
import {IDiagram} from '@process-engine/solutionexplorer.contracts';

import {
  ProcessInstanceListSortProperty,
  ProcessInstanceListSortSettings,
  ProcessInstanceTableEntry,
} from '../../../../../../../contracts/index';
import environment from '../../../../../../../environment';
import {getBeautifiedDate} from '../../../../../../../services/date-service/date.service';
import {Pagination} from '../../../../../../pagination/pagination';

const PAGE_SIZES = [20, 50, 100, 200];
const MIN_PAGESIZE = PAGE_SIZES[0];
export const DEFAULT_PAGESIZE = PAGE_SIZES[1];

const PAGINATION_SIZE = 10;

@inject(EventAggregator)
export class ProcessInstanceList {
  @bindable public processInstanceToSelect: DataModels.Correlations.ProcessInstance;
  @bindable public processInstanceToSelectTableEntry: ProcessInstanceTableEntry;
  @bindable public selectedProcessInstance: DataModels.Correlations.ProcessInstance;
  @bindable @observable public processInstances: Array<DataModels.Correlations.ProcessInstance>;
  @bindable public activeDiagram: IDiagram;
  @bindable public sortedTableData: Array<ProcessInstanceTableEntry>;
  @bindable public paginationShowsLoading: boolean;
  @bindable public selectedCorrelation: DataModels.Correlations.Correlation;

  public pagination: Pagination;

  @bindable public totalCount: number;
  @bindable public currentPage: number = 1;
  @observable public pageSize: number = DEFAULT_PAGESIZE;
  public minPageSize: number = MIN_PAGESIZE;
  public paginationSize: number = PAGINATION_SIZE;
  public pageSizes: Array<number> = PAGE_SIZES;

  public processInstanceListSortProperty: typeof ProcessInstanceListSortProperty = ProcessInstanceListSortProperty;
  public sortSettings: ProcessInstanceListSortSettings = {
    ascending: true,
    sortProperty: ProcessInstanceListSortProperty.StartedAt,
  };

  public selectedTableEntry: ProcessInstanceTableEntry;

  private tableData: Array<ProcessInstanceTableEntry> = [];
  private eventAggregator: EventAggregator;

  constructor(eventAggregator: EventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  public showLogViewer(): void {
    this.eventAggregator.publish(environment.events.inspectCorrelation.showLogViewer);
  }

  public selectProcessInstance(selectedTableEntry: ProcessInstanceTableEntry): void {
    this.selectedProcessInstance = this.getProcessInstanceForTableEntry(selectedTableEntry);

    this.selectedTableEntry = selectedTableEntry;
  }

  public get showProcessInstanceToSelect(): boolean {
    return (
      this.processInstanceToSelect !== undefined &&
      this.processInstanceToSelectTableEntry !== undefined &&
      this.selectedCorrelation.id === this.processInstanceToSelect.correlationId
    );
  }

  public activeDiagramChanged(): void {
    this.currentPage = 1;
    this.processInstanceToSelect = undefined;
    this.processInstanceToSelectTableEntry = undefined;
  }

  public processInstancesChanged(): void {
    if (!this.activeDiagram) {
      return;
    }

    this.tableData = this.convertProcessInstancesIntoTableData(this.processInstances);
    this.sortTableData();

    const tableDataIsExisiting: boolean = this.sortedTableData.length > 0;

    if (tableDataIsExisiting) {
      const firstProcessInstanceFromCorrectProcessModel = this.sortedTableData.find(
        (processInstance: ProcessInstanceTableEntry) => {
          return processInstance.processModelId === this.activeDiagram.id;
        },
      );

      const firstTableEntry: ProcessInstanceTableEntry = this.sortedTableData[0];

      const processInstanceToSelect: ProcessInstanceTableEntry =
        firstProcessInstanceFromCorrectProcessModel !== undefined
          ? firstProcessInstanceFromCorrectProcessModel
          : firstTableEntry;

      this.selectProcessInstance(processInstanceToSelect);
    }

    const processInstanceToSelectExists: boolean = this.processInstanceToSelect !== undefined;
    if (processInstanceToSelectExists) {
      const processInstanceFromTableData: ProcessInstanceTableEntry = this.sortedTableData.find(
        (processInstance: ProcessInstanceTableEntry) => {
          return processInstance.processInstanceId === this.processInstanceToSelect.processInstanceId;
        },
      );

      const procesInstanceAlreadyExistsInTableData = processInstanceFromTableData;

      if (procesInstanceAlreadyExistsInTableData) {
        this.processInstanceToSelectTableEntry = processInstanceFromTableData;
      } else {
        const processInstanceToSelectTableEntry: Array<ProcessInstanceTableEntry> = this.convertProcessInstancesIntoTableData(
          [this.processInstanceToSelect],
        );

        this.processInstanceToSelectTableEntry = processInstanceToSelectTableEntry[0];
      }

      this.selectProcessInstance(this.processInstanceToSelectTableEntry);
    }

    this.paginationShowsLoading = false;
  }

  public pageSizeChanged(newValue, oldValue): void {
    const isNotInitializedYet = oldValue === undefined;
    if (isNotInitializedYet) {
      return;
    }

    const showAllProcessInstances: boolean = this.pageSize === 0;
    if (showAllProcessInstances) {
      this.currentPage = 1;
    }

    const isFirstPage: boolean = this.currentPage === 1;
    if (isFirstPage) {
      const payload = {
        offset: 0,
        limit: this.pageSize,
      };
      this.eventAggregator.publish(environment.events.inspectCorrelation.updateProcessInstances, payload);

      return;
    }

    const currentOffset: number = (this.currentPage - 1) * oldValue;

    this.currentPage = Math.floor(currentOffset / this.pageSize) + 1;
  }

  public currentPageChanged(newValue: number, oldValue: number): void {
    const isNotInitializedYet = oldValue === undefined;
    if (isNotInitializedYet) {
      return;
    }

    const payload = {
      offset: this.currentPage === 1 || this.currentPage === 0 ? 0 : (this.currentPage - 1) * this.pageSize,
      limit: this.pageSize,
    };

    this.eventAggregator.publish(environment.events.inspectCorrelation.updateProcessInstances, payload);
  }

  public changeSortProperty(property: ProcessInstanceListSortProperty): void {
    const isSameSortPropertyAsBefore: boolean = this.sortSettings.sortProperty === property;
    const ascending: boolean = isSameSortPropertyAsBefore ? !this.sortSettings.ascending : true;

    this.sortSettings.ascending = ascending;
    this.sortSettings.sortProperty = property;

    this.sortTableData();
  }

  private convertProcessInstancesIntoTableData(
    processInstances: Array<DataModels.Correlations.ProcessInstance>,
  ): Array<ProcessInstanceTableEntry> {
    return processInstances.map((processInstance: DataModels.Correlations.ProcessInstance) => {
      const formattedStartedDate: string = getBeautifiedDate(processInstance.createdAt);

      const tableEntry: ProcessInstanceTableEntry = {
        startedAt: formattedStartedDate,
        state: processInstance.state,
        user: processInstance.identity.userId,
        processModelId: processInstance.processModelId,
        processInstanceId: processInstance.processInstanceId,
      };

      return tableEntry;
    });
  }

  private sortTableData(): void {
    const sortByDate: boolean = this.sortSettings.sortProperty === ProcessInstanceListSortProperty.StartedAt;

    const sortedTableData: Array<ProcessInstanceTableEntry> = sortByDate
      ? this.sortTableDataByStartDate()
      : this.sortTableDataByProperty(this.sortSettings.sortProperty);

    this.sortedTableData = this.sortSettings.ascending ? sortedTableData : sortedTableData.reverse();
  }

  private sortTableDataByProperty(property: ProcessInstanceListSortProperty): Array<ProcessInstanceTableEntry> {
    const copyOfTableData: Array<ProcessInstanceTableEntry> = this.tableData.slice();

    const sortedTableData: Array<ProcessInstanceTableEntry> = copyOfTableData.sort(
      (firstEntry: ProcessInstanceTableEntry, secondEntry: ProcessInstanceTableEntry) => {
        const firstEntryIsBigger: boolean = firstEntry[property] > secondEntry[property];
        if (firstEntryIsBigger) {
          return 1;
        }

        const secondEntryIsBigger: boolean = firstEntry[property] < secondEntry[property];
        if (secondEntryIsBigger) {
          return -1;
        }

        return 0;
      },
    );

    return sortedTableData;
  }

  private sortTableDataByStartDate(): Array<ProcessInstanceTableEntry> {
    const copyOfTableData: Array<ProcessInstanceTableEntry> = this.tableData.slice();

    const sortedTableData: Array<ProcessInstanceTableEntry> = copyOfTableData.sort(
      (firstEntry: ProcessInstanceTableEntry, secondEntry: ProcessInstanceTableEntry) => {
        const firstProcessInstanceDate: Date = new Date(firstEntry.startedAt);
        const secondProcessInstanceDate: Date = new Date(secondEntry.startedAt);

        const firstEntryIsBigger: boolean = firstProcessInstanceDate.getTime() > secondProcessInstanceDate.getTime();
        if (firstEntryIsBigger) {
          return 1;
        }

        const secondEntryIsBigger: boolean = firstProcessInstanceDate.getTime() < secondProcessInstanceDate.getTime();
        if (secondEntryIsBigger) {
          return -1;
        }

        return 0;
      },
    );

    return sortedTableData;
  }

  private getProcessInstanceForTableEntry(
    tableEntry: ProcessInstanceTableEntry,
  ): DataModels.Correlations.ProcessInstance {
    const processInstanceForTableEntry: DataModels.Correlations.ProcessInstance = this.processInstances.find(
      (processInstance: DataModels.Correlations.ProcessInstance) => {
        return processInstance.processInstanceId === tableEntry.processInstanceId;
      },
    );

    return processInstanceForTableEntry || this.processInstanceToSelect;
  }
}
