import * as bundle from '@process-engine/bpmn-js-custom-bundle';
import {IBpmnModeler, IElementRegistry} from '../../contracts';

export async function validateIdsAsQnames(xml: string): Promise<Array<string>> {
  const modeler: IBpmnModeler = new bundle.modeler({
    moddleExtensions: {
      camunda: bundle.camundaModdleDescriptor,
    },
  });

  await new Promise((resolve, reject) => {
    modeler.importXML(xml, (error) => {
      if (error) {
        reject(error);

        return;
      }

      resolve();
    });
  });

  const elementRegistry: IElementRegistry = modeler.get('elementRegistry');

  const invalidIds = elementRegistry
    .getAll()
    .filter((element) => {
      return !/^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i.test(element.id);
    })
    .map((elementWithInvalidId) => {
      return elementWithInvalidId.id;
    });

  return invalidIds;
}
