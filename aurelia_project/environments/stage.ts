const processEngineRoute: string = 'http://localhost:8000';

// tslint:disable-next-line no-default-export
export default {
  debug: true,
  testing: false,
  processlist: {
    pageLimit: 10,
  },
  openIdConnect: {
    authority: 'http://localhost:5000',
  },
  processengine: {
    poolingInterval: 10000,
    routes: {
      processes: `${processEngineRoute}/datastore/ProcessDef`,
      startProcess: `${processEngineRoute}/processengine/start`,
      processInstances: `${processEngineRoute}/datastore/Process`,
      messageBus: `${processEngineRoute}/mb`,
      iam: `${processEngineRoute}/iam`,
      userTasks: `${processEngineRoute}/datastore/UserTask`,
      importBPMN: `${processEngineRoute}/processengine/create_bpmn_from_xml`,
    },
  },
  events: {
    xmlChanged: 'xmlChanged',
    refreshProcessDefs: 'processdefs:refresh',
    statusBar: {
      showDiagramViewButtons: 'statusbar:diagramviewbuttons:show',
      hdieDiagramViewButtons: 'statusbar:diagramviewbuttons:hide',
      updateProcessEngineRoute: 'statusbar:processEngineRoute:update',
    },
    navBar: {
      showTools: 'navbar:tools:show',
      hideTools: 'navbar:tools:hide',
      showStartButton: 'navbar:startButton:show',
      hideStartButton: 'navbar:startButton:hide',
      updateProcess: 'navbar:process:update',
      disableSaveButton: 'navbar:saveButton:disable',
      enableSaveButton: 'navbar:saveButton:enable',
    },
    processDefDetail: {
      printDiagram: 'processdefdetail:diagram:print',
      saveDiagram: 'processdefdetail:diagram:save',
      exportDiagramAs: 'processdefdetail:diagram:exportas',
      startProcess: 'processdefdetail:process:start',
      toggleXMLView: 'processdefdetail:xmlview:toggle',
    },
    bpmnio: {
      toggleXMLView: 'processdefdetail:xmlview:toggle',
      toggleDiffView: 'processdefdetail:diffview:toggle',
    },
    diffView: {
      changeDiffMode: 'diffview:diffmode:change',
      toggleChangeList: 'diffview:changelist:toggle',
    },
    diagramChange: 'diagram:change',
    processSolutionPanel: {
      toggleProcessSolutionExplorer: 'processSolutionPanel:processsolutionexplorer:toggle',
    },
  },
  bpmnStudioClient: {
    baseRoute: processEngineRoute,
  },
  propertyPanel: {
    defaultWidth: 250,
  },
  colorPickerSettings: {
    preferredFormat: 'hex',
    clickoutFiresChange: true,
    showPalette: true,
    maxSelectionSize: 8,
    showInitial: true,
    showInput: true,
    allowEmpty: true,
    showButtons: false,
    containerClassName: 'colorpicker-container',
  },
};
