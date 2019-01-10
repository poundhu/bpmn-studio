import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {bindable, bindingMode, inject} from 'aurelia-framework';
import {activationStrategy, NavigationInstruction, Redirect, Router} from 'aurelia-router';

import {IDiagram} from '@process-engine/solutionexplorer.contracts';

import {ISolutionEntry, ISolutionService, NotificationType} from '../../contracts/index';
import environment from '../../environment';
import {NotificationService} from '../notification/notification.service';
import {DiagramDetail} from './diagram-detail/diagram-detail';

export interface IDesignRouteParameters {
  view?: string;
  diagramName?: string;
  solutionUri?: string;
}

type IEventListener = {
  name: string,
  function: Function,
};

@inject(EventAggregator, 'SolutionService', Router, 'NotificationService')
export class Design {

  @bindable() public activeDiagram: IDiagram;
  @bindable() public activeSolutionEntry: ISolutionEntry;

  @bindable({defaultBindingMode: bindingMode.oneWay}) public xml: string;

  public showQuitModal: boolean;
  public showLeaveModal: boolean;

  public showDetail: boolean = true;
  public showXML: boolean;
  public showDiff: boolean;
  public propertyPanelShown: boolean;
  public showPropertyPanelButton: boolean = true;
  public showDiffDestinationButton: boolean = false;

  @bindable() public xmlForDiff: string;
  public diagramDetail: DiagramDetail;

  private _eventAggregator: EventAggregator;
  private _notificationService: NotificationService;
  private _solutionService: ISolutionService;
  private _subscriptions: Array<Subscription>;
  private _router: Router;
  private _routeView: string;
  private _ipcRenderer: any;
  private _ipcRendererEventListeners: Array<IEventListener> = [];

  constructor(eventAggregator: EventAggregator, solutionService: ISolutionService, router: Router, notificationService: NotificationService) {
    this._eventAggregator = eventAggregator;
    this._solutionService = solutionService;
    this._router = router;
    this._notificationService = notificationService;
  }

  public async activate(routeParameters: IDesignRouteParameters): Promise<void> {
    const isRunningInElectron: boolean = Boolean((window as any).nodeRequire);
    if (isRunningInElectron) {
      this._prepareSaveModalForClosing();
    }

    const solutionIsSet: boolean = routeParameters.solutionUri !== undefined;
    const diagramNameIsSet: boolean = routeParameters.diagramName !== undefined;

    const routerAndInstructionIsNotNull: boolean = this._router !== null
                                                && this._router.currentInstruction !== null;

    const diagramNamesAreDifferent: boolean = routerAndInstructionIsNotNull
                                              ? routeParameters.diagramName !== this._router.currentInstruction.params.diagramName
                                              : true;

    const routeFromOtherView: boolean = routerAndInstructionIsNotNull
                                      ? this._router.currentInstruction.config.name !== 'design'
                                      : true;

    const navigateToAnotherDiagram: boolean = diagramNamesAreDifferent || routeFromOtherView;

    if (solutionIsSet) {
      this.activeSolutionEntry = this._solutionService.getSolutionEntryForUri(routeParameters.solutionUri);

      /**
       * We have to open the solution here again since if we come here after a
       * reload the solution might not be opened yet.
       */
      await this.activeSolutionEntry.service.openSolution(this.activeSolutionEntry.uri, this.activeSolutionEntry.identity);

      const isSingleDiagram: boolean = this.activeSolutionEntry.uri === 'Single Diagrams';

      if (navigateToAnotherDiagram) {

        if (isSingleDiagram) {
          const persistedDiagrams: Array<IDiagram> = this._solutionService.getSingleDiagrams();

          this.activeDiagram = persistedDiagrams.find((diagram: IDiagram) => {
            return diagram.name === routeParameters.diagramName;
          });

        } else {

          this.activeDiagram = diagramNameIsSet
                             ? await this.activeSolutionEntry.service.loadDiagram(routeParameters.diagramName)
                             : undefined;
        }

        const diagramNotFound: boolean = this.activeDiagram === undefined;

        if (diagramNotFound) {
          this._router.navigateToRoute('start-page');
          this._notificationService.showNotification(NotificationType.INFO, 'Diagram could not be opened!');
        }

        this.xml = this.activeDiagram.xml;
      }
    }

    const routeViewIsDetail: boolean = routeParameters.view === 'detail';
    const routeViewIsXML: boolean = routeParameters.view === 'xml';
    const routeViewIsDiff: boolean = routeParameters.view === 'diff';
    this._routeView = routeParameters.view;

    if (routeViewIsDetail) {
      this.showDetail = true;
      this.showXML = false;
      this.showDiff = false;
      this.showPropertyPanelButton = true;
      this.showDiffDestinationButton = false;
    } else if (routeViewIsXML) {
      this.showDetail = false;
      this.showXML = true;
      this.showDiff = false;
      this.showDiffDestinationButton = false;
      this.showPropertyPanelButton = false;
    } else if (routeViewIsDiff) {
      /**
       * We need to check this, because after a reload the diagramdetail component is not attached yet.
       */
      const diagramDetailIsNotAttached: boolean = this.diagramDetail === undefined;
      if (diagramDetailIsNotAttached) {
        return;
      }

      this.xmlForDiff = await this.diagramDetail.getXML();

      this._showDiff();
    }
  }

  public async attached(): Promise<void> {
    const routeViewIsDiff: boolean = this._routeView === 'diff';
    if (routeViewIsDiff) {
      this._showDiff();
    }

    this._subscriptions = [
      this._eventAggregator.subscribe(environment.events.bpmnio.propertyPanelActive, (showPanel: boolean) => {
        this.propertyPanelShown = showPanel;
      }),
    ];

    this._eventAggregator.publish(environment.events.statusBar.showDiagramViewButtons);
  }

  public detached(): void {
    this._eventAggregator.publish(environment.events.statusBar.hideDiagramViewButtons);
    this._subscriptions.forEach((subscription: Subscription) => subscription.dispose());
  }

  public determineActivationStrategy(): string {

    return activationStrategy.invokeLifecycle;
  }

  public setDiffDestination(diffDestination: string): void {
    this._eventAggregator.publish(environment.events.diffView.setDiffDestination, diffDestination);
  }

  public togglePanel(): void {
    this._eventAggregator.publish(environment.events.bpmnio.togglePropertyPanel);
  }

  public async canDeactivate(destinationInstruction: NavigationInstruction): Promise<Redirect> {
    const userCanNotDeactivateRoute: boolean = !(await this.canDeactivateModal(destinationInstruction));
    if (userCanNotDeactivateRoute) {
      /*
      * As suggested in https://github.com/aurelia/router/issues/302, we use
      * the router directly to navigate back, which results in staying on this
      * component-- and this is the desired behaviour.
      */
      return new Redirect(this._router.currentInstruction.fragment, {trigger: false, replace: false});
    }
  }

  public async canDeactivateModal(currentRouteInstruction: NavigationInstruction): Promise<boolean> {
    const modalResult: Promise<boolean> = new Promise((resolve: Function, reject: Function): boolean | void => {

      const modalCanBeSuppressed: boolean = !this.diagramDetail.diagramHasChanged || this._modalCanBeSuppressed(currentRouteInstruction);
      if (modalCanBeSuppressed) {
        resolve(true);

        return;
      }

      this.showLeaveModal = true;

      // register onClick handler
      document.getElementById('dontSaveButtonLeaveView').addEventListener('click', () => {
        this.showLeaveModal = false;
        this.diagramDetail.diagramHasChanged = false;
        this._eventAggregator.publish(environment.events.navBar.diagramChangesResolved);

        resolve(true);
      });

      document.getElementById('saveButtonLeaveView').addEventListener('click', async() => {
        if (this.diagramDetail.diagramIsInvalid) {
          resolve(false);
        }

        this.showLeaveModal = false;
        await this.diagramDetail.saveDiagram();
        this.diagramDetail.diagramHasChanged = false;

        resolve(true);
      });

      document.getElementById('cancelButtonLeaveView').addEventListener('click', () => {
        this.showLeaveModal = false;

        resolve(false);
      });
    });

    return modalResult;
  }

  public deactivate(): void {
    this.diagramDetail.deactivate();

    for (const eventListener of this._ipcRendererEventListeners) {
      this._ipcRenderer.removeListener(eventListener.name, eventListener.function);
    }
  }

  public activeDiagramChanged(newValue: IDiagram, oldValue: IDiagram): void {
    const activeDiagramDidNotChange: boolean = newValue.id === oldValue.id
                                            && newValue.uri === oldValue.uri;
    if (activeDiagramDidNotChange) {
      return;
    }

    this.xmlForDiff = this.activeDiagram.xml;
  }

  public get remoteSolutions(): Array<ISolutionEntry> {
    const remoteSolutions: Array<ISolutionEntry> = this._solutionService.getRemoteSolutionEntries();

    const remoteSolutionsWithoutActive: Array<ISolutionEntry> = remoteSolutions.filter((remoteSolution: ISolutionEntry) => {
      return remoteSolution.uri !== this.activeSolutionEntry.uri;
    });

    return remoteSolutionsWithoutActive;
  }

  private _showDiff(): void {
    this.showDiff = true;
    this.showDetail = false;
    this.showXML = false;
    this.showPropertyPanelButton = false;
    this.showDiffDestinationButton = true;
  }

  private _prepareSaveModalForClosing(): void {
    this._ipcRenderer = (window as any).nodeRequire('electron').ipcRenderer;

    const showCloseModalEventName: string = 'show-close-modal';

    const showCloseModalFunction: Function = (): void => {
      this.showQuitModal = true;
    };

    this._ipcRenderer.on(showCloseModalEventName, showCloseModalFunction);
    this._ipcRendererEventListeners.push({
                                            name: showCloseModalEventName,
                                            function: showCloseModalFunction,
                                        });

  }

  public quitWithoutSaving(): void {
    this._ipcRenderer.send('can-not-close', false);
    this._ipcRenderer.send('close-bpmn-studio');
  }

  public async quitWithSaving(): Promise<void> {
    if (this.diagramDetail.diagramIsInvalid) {
      return;
    }

    await this.diagramDetail.saveDiagram();
    this.diagramDetail.diagramHasChanged = false;

    this._ipcRenderer.send('close-bpmn-studio');
  }

  public cancelQuitting(): void {
    this.showQuitModal = false;
  }

  /**
   * This function checks, if the 'Save unsaved changes' Modal can be
   * suppressed.
   *
   * This is the case, if the user basically navigates between the detail,
   * the xml and the diff view, since the current xml will passed between
   * these views.
   *
   * Therefore, the following paths will suppress the modal:
   *  * detail  <-->   xml
   *  * detail  <-->   diff
   *  * diff    <-->   xml
   *
   * @param destinationInstruction The current router instruction which contains
   * the destination router parameters.
   */
  private _modalCanBeSuppressed(destinationInstruction: NavigationInstruction): boolean {
    const oldView: string = this._router.currentInstruction.params.view;
    const destinationView: string = destinationInstruction.params.view;

    const navigatingBetween: Function = (routeA: string, routeB: string): boolean =>
      (routeA === oldView || routeA === destinationView) && (routeB === oldView || routeB === destinationView);

    const shouldModalBeSuppressed: boolean = navigatingBetween('diff', 'xml')
      || navigatingBetween('diff', 'detail')
      || navigatingBetween('xml', 'detail');

    return shouldModalBeSuppressed;
  }
}
