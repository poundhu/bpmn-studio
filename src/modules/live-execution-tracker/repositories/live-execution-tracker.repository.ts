import {inject} from 'aurelia-framework';

import {Subscription} from '@essential-projects/event_aggregator_contracts';
import {IIdentity} from '@essential-projects/iam_contracts';
import {DataModels, IManagementApi} from '@process-engine/management_api_contracts';
import {ActiveToken} from '@process-engine/management_api_contracts/dist/data_models/kpi/index';
import {EndEventReachedMessage, TerminateEndEventReachedMessage} from '@process-engine/management_api_contracts/dist/messages/bpmn_events/index';

import {ILiveExecutionTrackerRepository, RequestError} from '../contracts/index';

@inject('ManagementApiClientService')
export class LiveExecutionTrackerRepository implements ILiveExecutionTrackerRepository {

  private _managementApiClient: IManagementApi;
  private _identity: IIdentity;

  private _maxRetries: number = 5;
  private _retryDelayInMs: number = 500;

  constructor(managementApiClientService: IManagementApi) {
    this._managementApiClient = managementApiClientService;
  }

  public async getFlowNodeInstancesForProcessInstance(processInstanceId: string): Promise<Array<DataModels.FlowNodeInstances.FlowNodeInstance>> {
    return this._managementApiClient.getFlowNodeInstancesForProcessInstance(this._identity, processInstanceId);
  }

  public async getCorrelationById(correlationId: string): Promise<DataModels.Correlations.Correlation> {
    // This is necessary because the managementApi sometimes throws an error when the correlation is not yet existing.
    for (let retries: number = 0; retries < this._maxRetries; retries++) {
      try {
        return await this._managementApiClient.getCorrelationById(this._identity, correlationId);
      } catch {
        await new Promise((resolve: Function): void => {
          setTimeout(() => {
            resolve();
          }, this._retryDelayInMs);
        });
      }
    }

    return undefined;
  }

  public async isProcessInstanceActive(processInstanceId: string): Promise<boolean> {

    const getActiveTokens: Function = async(): Promise<Array<ActiveToken> | RequestError> => {
      for (let retries: number = 0; retries < this._maxRetries; retries++) {
        try {
          return await this._managementApiClient
                           .getActiveTokensForProcessInstance(this._identity, processInstanceId);
        } catch (error) {
          const errorIsConnectionLost: boolean = error.message === 'Failed to fetch';

          if (errorIsConnectionLost) {
            return RequestError.ConnectionLost;
          }
        }
      }

      return RequestError.OtherError;
    };

    const activeTokensOrRequestError: Array<ActiveToken> | RequestError = await getActiveTokens();

    const couldNotGetActiveTokens: boolean = activeTokensOrRequestError === RequestError.ConnectionLost
                                          || activeTokensOrRequestError === RequestError.OtherError;
    if (couldNotGetActiveTokens) {
      const requestError: RequestError = (activeTokensOrRequestError as RequestError);

      throw requestError;
    }

    const allActiveTokens: Array<ActiveToken> = activeTokensOrRequestError as Array<ActiveToken>;

    const correlationIsActive: boolean = allActiveTokens.length > 0;

    return correlationIsActive;
  }

  public async getTokenHistoryGroupForProcessInstance(processInstanceId: string): Promise<DataModels.TokenHistory.TokenHistoryGroup | null> {
    for (let retries: number = 0; retries < this._maxRetries; retries++) {
      try {
        return await this._managementApiClient.getTokensForProcessInstance(this._identity, processInstanceId);
      } catch {
        await new Promise((resolve: Function): void => {
          setTimeout(() => {
            resolve();
          }, this._retryDelayInMs);
        });
      }
    }

    return null;
  }

  public async getActiveTokensForProcessInstance(processInstanceId: string): Promise<Array<ActiveToken> | null> {
    for (let retries: number = 0; retries < this._maxRetries; retries++) {
      try {
        return await this._managementApiClient.getActiveTokensForProcessInstance(this._identity, processInstanceId);
      } catch {
        await new Promise((resolve: Function): void => {
          setTimeout(() => {
            resolve();
          }, this._retryDelayInMs);
        });
      }
    }

    return null;
  }

  public async getEmptyActivitiesForProcessInstance(processInstanceId: string): Promise<DataModels.EmptyActivities.EmptyActivityList | null> {
    for (let retries: number = 0; retries < this._maxRetries; retries++) {
      try {
        return await this._managementApiClient.getEmptyActivitiesForProcessInstance(this._identity, processInstanceId);
      } catch {
        await new Promise((resolve: Function): void => {
          setTimeout(() => {
            resolve();
          }, this._retryDelayInMs);
        });
      }
    }

    return null;
  }

  public async finishEmptyActivity(processInstanceId: string,
                                   correlationId: string,
                                   emptyActivity: DataModels.EmptyActivities.EmptyActivity): Promise<void> {

    return this._managementApiClient.finishEmptyActivity(this._identity,
                                                         processInstanceId,
                                                         correlationId,
                                                         emptyActivity.flowNodeInstanceId);
  }

  public async getProcessModelById(processModelId: string): Promise<DataModels.ProcessModels.ProcessModel> {
    return await this._managementApiClient.getProcessModelById(this._identity, processModelId);
  }

  public setIdentity(identity: IIdentity): void {
    this._identity = identity;
  }

  public createProcessEndedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onProcessEnded(this._identity, (message: EndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createProcessTerminatedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onProcessTerminated(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createUserTaskWaitingEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onUserTaskWaiting(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createActivityReachedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onActivityReached(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createActivityFinishedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onActivityFinished(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createUserTaskFinishedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onUserTaskFinished(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createManualTaskWaitingEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onManualTaskWaiting(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createManualTaskFinishedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onManualTaskFinished(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createEmptyActivityWaitingEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onEmptyActivityWaiting(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createEmptyActivityFinishedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onEmptyActivityFinished(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createBoundaryEventTriggeredEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onBoundaryEventTriggered(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createIntermediateThrowEventTriggeredEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onIntermediateThrowEventTriggered(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createIntermediateCatchEventReachedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onIntermediateCatchEventReached(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public createIntermediateCatchEventFinishedEventListener(processInstanceId: string, callback: Function): Promise<Subscription> {
    return this._managementApiClient.onIntermediateCatchEventFinished(this._identity, (message: TerminateEndEventReachedMessage): void => {
      const eventIsForAnotherProcessInstance: boolean = message.processInstanceId !== processInstanceId;
      if (eventIsForAnotherProcessInstance) {
        return;
      }

      callback();
    });
  }

  public removeSubscription(subscription: Subscription): Promise<void> {
    return this._managementApiClient.removeSubscription(this._identity, subscription);
  }

  public terminateProcess(processInstanceId: string): Promise<void> {
    return this._managementApiClient.terminateProcessInstance(this._identity, processInstanceId);
  }
}