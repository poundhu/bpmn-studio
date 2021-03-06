import {ScriptTaskTokenUsageHelpText} from './help-texts/script-task-token-usage';

import {HelpText, HelpTextId} from '../../contracts/index';

export class HelpTextService {
  public getHelpTextById(helpTextId: HelpTextId): HelpText {
    switch (helpTextId) {
      case HelpTextId.ScriptTaskTokenUsageHelpText:
        return ScriptTaskTokenUsageHelpText;
      default:
        throw new Error(`Help message with id "${helpTextId}" is unknown.`);
    }
  }
}
