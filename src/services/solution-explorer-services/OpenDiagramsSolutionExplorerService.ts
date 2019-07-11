import {inject} from 'aurelia-framework';

import {IIdentity} from '@essential-projects/iam_contracts';
import {IDiagram, ISolution} from '@process-engine/solutionexplorer.contracts';
import {ISolutionExplorerService} from '@process-engine/solutionexplorer.service.contracts';

import {IDiagramState, IDiagramValidationService, ISolutionService} from '../../contracts';
import {OpenDiagramStateService} from './OpenDiagramStateService';
import {SolutionExplorerServiceFactory} from './SolutionExplorerServiceFactory';

/**
 * This service allows to keep all opened open diagrams inside a solution.
 *
 * This is needed because the default solution explorer does not keep state
 * about open diagrams.
 *
 * With this service you can retrieve, all opened diagrams inside a
 * solution.
 *
 * To remove a diagram from the solution, call use #closeDiagram().
 */

@inject('DiagramValidationService', 'SolutionExplorerServiceFactory', 'SolutionService', 'OpenDiagramStateService')
export class OpenDiagramsSolutionExplorerService implements ISolutionExplorerService {

  public isCreatingDiagram: boolean;

  private _validationService: IDiagramValidationService;
  private _solutionExplorerToOpenDiagrams: ISolutionExplorerService;
  private _uriOfOpenDiagramService: string = 'about:open-diagrams';
  private _nameOfOpenDiagramService: string = 'Open Diagrams';
  private _openedDiagrams: Array<IDiagram> = [];
  private _solutionService: ISolutionService;
  private _openDiagramStateService: OpenDiagramStateService;

  constructor(
    validationService: IDiagramValidationService,
    serviceFactory: SolutionExplorerServiceFactory,
    solutionService: ISolutionService,
    openDiagramStateService: OpenDiagramStateService,
  ) {
    this._validationService = validationService;
    this._setSolutionExplorer(serviceFactory);
    this._solutionService = solutionService;
    this._openDiagramStateService = openDiagramStateService;
  }

  public getOpenedDiagrams(): Array<IDiagram> {
    return this._openedDiagrams;
  }

  /**
   * Gets the open diagram with the given uri, if the diagram was opened
   * before.
   */
  public getOpenedDiagramByURI(uri: string): IDiagram | null {
    const indexOfDiagram: number = this._findIndexOfDiagramWithURI(uri);

    const diagramWasNotFound: boolean = indexOfDiagram < 0;
    if (diagramWasNotFound) {
      return null;
    }

    const diagramWithURI: IDiagram = this._openedDiagrams[indexOfDiagram];

    return diagramWithURI;
  }

  public openSolution(pathspec: string, identity: IIdentity): Promise<void> {
    return Promise.resolve();
  }

  public loadSolution(): Promise<ISolution> {
    const solution: ISolution = {
      diagrams: this._openedDiagrams,
      name: this._nameOfOpenDiagramService,
      uri: this._uriOfOpenDiagramService,
    };
    return Promise.resolve(solution);
  }

  public async openDiagram(uri: string, identity: IIdentity): Promise<IDiagram> {

    const uriIsNoBpmnFile: boolean = !uri.endsWith('.bpmn');
    if (uriIsNoBpmnFile) {
      throw new Error('File is no BPMN file.');
    }

    const uriAlreadyOpened: boolean = this._findIndexOfDiagramWithURI(uri) >= 0;
    if (uriAlreadyOpened) {
      throw new Error('This diagram is already opened.');
    }

    const lastIndexOfSlash: number = uri.lastIndexOf('/');
    const lastIndexOfBackSlash: number = uri.lastIndexOf('\\');
    const indexBeforeFilename: number = Math.max(lastIndexOfSlash, lastIndexOfBackSlash);

    const filepath: string = uri.substring(0, indexBeforeFilename);
    const filename: string = uri.replace(/^.*[\\\/]/, '');
    const filenameWithoutEnding: string = filename.replace('.bpmn', '');

    let diagram: IDiagram;

    const isUnsavedDiagram: boolean = filepath === 'about:open-diagrams';
    if (isUnsavedDiagram) {
      const diagramState: IDiagramState = this._openDiagramStateService.loadDiagramState(uri);

      diagram = {
        name: filenameWithoutEnding,
        xml: diagramState.data.xml,
        uri: uri,
      };
    } else {
      await this._solutionExplorerToOpenDiagrams.openSolution(filepath, identity);

      diagram = await this._solutionExplorerToOpenDiagrams.loadDiagram(filenameWithoutEnding, filepath);

      await this._validationService
        .validate(diagram.xml)
        .isXML()
        .isBPMN()
        .throwIfError();
    }

    this._openedDiagrams.push(diagram);

    return diagram;
  }

  public closeDiagram(diagram: IDiagram): Promise<void> {
    const index: number = this._findIndexOfDiagramWithURI(diagram.uri);

    this._openedDiagrams.splice(index, 1);
    this._openDiagramStateService.deleteDiagramState(diagram.uri);

    return Promise.resolve();
  }

  public renameDiagram(diagram: IDiagram, newName: string): Promise<IDiagram> {
    throw new Error('Method not supported.');
  }

  public deleteDiagram(diagram: IDiagram): Promise<void> {
    throw new Error('Method not supported.');
  }

  public async loadDiagram(diagramName: string): Promise<IDiagram> {

    const diagramToLoad: IDiagram = this._openedDiagrams.find((diagram: IDiagram) => {
                                      return diagram.name === diagramName;
                                    });

    return diagramToLoad;
  }

  public saveSolution(solution: ISolution, pathspec?: string): Promise<void> {
    throw new Error('Method not supported.');
  }

  public saveDiagram(diagram: IDiagram, pathspec?: string): Promise<void> {

    return this._solutionExplorerToOpenDiagrams.saveDiagram(diagram, pathspec);
  }

  public async openDiagramFromSolution(diagramUri: string, identity: IIdentity): Promise<IDiagram> {
    const openedDiagram: IDiagram = await this.openDiagram(diagramUri, identity);

    this._solutionService.addOpenDiagram(openedDiagram);

    return openedDiagram;
  }

  private _findIndexOfDiagramWithURI(uri: string): number {
    const index: number = this._openedDiagrams
      .findIndex((diagram: IDiagram): boolean => {
        return diagram.uri === uri;
    });

    return index;
  }

  private async _setSolutionExplorer(serviceFactory: SolutionExplorerServiceFactory): Promise<void> {
    this._solutionExplorerToOpenDiagrams = await serviceFactory.newFileSystemSolutionExplorer();
  }
}