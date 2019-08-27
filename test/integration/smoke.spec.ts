import {Application} from 'spectron';
import path from 'path';

import {TestClient} from './TestClient';

const isWindows = process.platform === 'win32';
const applicationArgs = getApplicationArgs(process.env.SPECTRON_APP_PATH);

function getApplicationArgs(givenPath: string | null): any {
  const commonArgs = {
    requireName: 'nodeRequire',
    webdriverOptions: {
      deprecationWarnings: false,
    },
  };

  if (givenPath != null) {
    console.log(`Using path: ${givenPath}`);
    return {...commonArgs, path: givenPath};
  }

  const electronExecutable = isWindows ? 'electron.cmd' : 'electron';
  const electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', electronExecutable);
  const electronBundlePath = path.join(__dirname, '..', '..', 'electron_app', 'electron.js');

  return {...commonArgs, path: electronPath, args: [electronBundlePath]};
}

async function createAndOpenDiagram(): Promise<void> {
  if (!creatingFirstDiagram) {
    await testClient.openStartPage();
  }

  await testClient.ensureVisible('[data-test-create-new-diagram]');
  await testClient.clickOn('[data-test-create-new-diagram]');
  await testClient.ensureVisible('.process-details-title');
}

let app: Application;
let testClient: TestClient;

let creatingFirstDiagram: boolean = true;

describe('Application launch', function foo() {
  this.slow(10000);
  this.timeout(15000);

  beforeEach(async () => {
    app = new Application(applicationArgs);
    testClient = new TestClient(app);

    creatingFirstDiagram = true;
    await app.start();
    await testClient.awaitReadyness();
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
    return null;
  });

  it('should start the application', async () => {
    await app.client.waitUntilTextExists('h3', 'Welcome');

    await testClient.assertWindowTitleIs('Start Page | BPMN Studio');
  });

  it('should create and open a new diagam by clicking on new diagram link', async () => {
    await createAndOpenDiagram();

    await testClient.assertNavbarTitleIs('Untitled-1');
    await testClient.assertWindowTitleIs('Design | BPMN Studio');
  });

  it('should render a diagram correctly', async () => {
    await createAndOpenDiagram();

    await testClient.ensureVisible('[data-element-id="Collaboration_1cidyxu"]');
  });

  it('should select StartEvent after opening a diagram', async () => {
    await createAndOpenDiagram();
    await testClient.showPropertyPanel();

    await testClient.assertSelectedBpmnElementHasName('Start Event');
  });

  it('should select element on click', async () => {
    await createAndOpenDiagram();
    await testClient.showPropertyPanel();

    const elementName = 'End Event';

    await testClient.rejectSelectedBpmnElementHasName(elementName);
    await testClient.clickOnBpmnElementWithName(elementName);
    await testClient.assertSelectedBpmnElementHasName(elementName);
  });

  it('should create and open a second diagram', async () => {
    await createAndOpenDiagram();

    await testClient.assertNavbarTitleIs('Untitled-1');
    await testClient.assertWindowTitleIs('Design | BPMN Studio');

    creatingFirstDiagram = false;
    await createAndOpenDiagram();

    await testClient.assertNavbarTitleIs('Untitled-2');
  });

  it('should open detail view', async () => {
    await createAndOpenDiagram();
    await testClient.openStartPage();

    await testClient.openDesignViewForDiagram(
      'Untitled-1',
      'about:open-diagrams/Untitled-1.bpmn',
      'about:open-diagrams',
    );
  });

  it('should open XML view', async () => {
    await createAndOpenDiagram();

    await testClient.openXmlViewForDiagram('Untitled-1', 'about:open-diagrams/Untitled-1.bpmn', 'about:open-diagrams');
  });

  it('should open diff view', async () => {
    await createAndOpenDiagram();

    await testClient.openDiffViewForDiagram('Untitled-1', 'about:open-diagrams/Untitled-1.bpmn', 'about:open-diagrams');
  });

  it('should open the xml view from the status bar', async () => {
    await createAndOpenDiagram();
    await testClient.openXmlViewFromStatusbar();
  });

  it('should open design view from the status bar', async () => {
    await createAndOpenDiagram();

    await testClient.openXmlViewFromStatusbar();
    await testClient.openDesignViewFromStatusbar();
  });

  it('should open a solution', async () => {
    await testClient.ensureVisible('h3=Welcome to BPMN Studio!');

    await testClient.openDirectoryAsSolution('fixtures');
    await testClient.ensureVisible('.solution-entry__solution-name=fixtures');
  });

  it('should create and open a new diagam by clicking on new diagram link', async () => {
    await createAndOpenDiagram();

    const navbarTitle = await testClient.getTextFromElement('.process-details-title');
    assert.equal(navbarTitle, 'Untitled-1');

    const title = await testClient.webdriverClient.getTitle();
    assert.equal(title, 'Design | BPMN-Studio');
  });

  it('should render a diagram correctly', async () => {
    await createAndOpenDiagram();

    await testClient.ensureVisible('[data-element-id="Collaboration_1cidyxu"]');
  });

  it('should select StartEvent after opening a diagram', async () => {
    await createAndOpenDiagram();
    await testClient.showPropertyPanel();
    await testClient.assertSelectedBPMNElementHasName('StartEvent_1mox3jl');
  });

  it('select EndEvent', async () => {
    const endEventId = 'EndEvent_0eie6q6';

    await createAndOpenDiagram();
    await testClient.showPropertyPanel();
    await testClient.assertSelectedBPMNElementHasNotName(endEventId);
    await testClient.pause(2000);
    await testClient.clickOnBPMNElementWithName(endEventId);
    await testClient.assertSelectedBPMNElementHasName(endEventId);
  });

  it('should create and open a second diagram', async () => {
    let navbarTitle;

    await app.client.waitUntilTextExists('h3', 'Welcome');

    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();

    navbarTitle = await testClient.getTextFromElement('.process-details-title');
    assert.equal(navbarTitle, 'Untitled-1');

    const title = await testClient.webdriverClient.getTitle();
    assert.equal(title, 'Design | BPMN-Studio');

    creatingFirstDiagram = false;
    await createAndOpenDiagram();

    navbarTitle = await testClient.getTextFromElement('.process-details-title');
    assert.equal(navbarTitle, 'Untitled-2');
  });

  it('should navigate to detail view', async () => {
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();
    await testClient.navigateToStartPage();

    await testClient.navigateToDetailView('Untitled-1', 'about:open-diagrams/Untitled-1.bpmn', 'about:open-diagrams');

    await testClient.ensureVisible('diagram-detail');
  });

  it('should navigate to XML view', async () => {
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();
    await testClient.navigateToStartPage();

    await testClient.navigateToXMLView('Untitled-1', 'about:open-diagrams/Untitled-1.bpmn', 'about:open-diagrams');

    await testClient.ensureVisible('bpmn-xml-view');
  });

  it('should navigate to diff view', async () => {
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();
    await testClient.navigateToStartPage();

    await testClient.navigateToDiffView('Untitled-1', 'about:open-diagrams/Untitled-1.bpmn', 'about:open-diagrams');

    await testClient.ensureVisible('bpmn-diff-view');
  });

  it('should show the XML view after clicking on the button in the status bar', async () => {
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();
    await testClient.ensureVisible('[data-test-status-bar-xml-view-button]');

    await testClient.clickOn('[data-test-status-bar-xml-view-button]');
    await testClient.ensureVisible('bpmn-xml-view');
  });

  it('should switch from XML view to detail view, after clicking on the button in the status bar', async () => {
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);

    await createAndOpenDiagram();

    await testClient.clickOn('[data-test-status-bar-xml-view-button]');

    await testClient.ensureVisible('[data-test-status-bar-disable-xml-view-button]');
    await testClient.clickOn('[data-test-status-bar-disable-xml-view-button]');
    await testClient.ensureVisible('diagram-detail');
  });
});
