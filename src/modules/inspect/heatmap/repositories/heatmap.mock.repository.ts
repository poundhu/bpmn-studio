import { inject } from 'aurelia-framework';

import { IIdentity } from '@essential-projects/iam_contracts';
import { ManagementApiClientService } from '@process-engine/management_api_client';
import { DataModels } from '@process-engine/management_api_contracts';

import { IAuthenticationService } from '../../../../contracts';
import { IHeatmapRepository } from '../contracts/IHeatmap.Repository';

@inject('ManagementApiClientService', 'AuthenticationService')
export class HeatmapMockRepository implements IHeatmapRepository {
  private _managementApiClient: ManagementApiClientService;
  private _authenticationService: IAuthenticationService;
  private _identity: IIdentity;

  private _mockDataForHeatmapSampleProcess: Array<DataModels.Kpi.FlowNodeRuntimeInformation> = [
    /** 3 Tasks */
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'Task_1sy1ibw',
      arithmeticMeanRuntimeInMs: 10000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'Task_0julnc5',
      arithmeticMeanRuntimeInMs: 10000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'Task_04fbo5q',
      arithmeticMeanRuntimeInMs: 10000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    /** 2 Gateways */
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'ExclusiveGateway_0fi1ct7',
      arithmeticMeanRuntimeInMs: 5000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 5100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'ExclusiveGateway_134ybqm',
      arithmeticMeanRuntimeInMs: 5100.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 4900.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    /** 7 Edges */
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_1jdocur',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_1g8yhyu',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_0szygwm',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_17fbkvc',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_027yae2',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    },
    {
      processModelId: 'heatmap_sample',
      flowNodeId: 'SequenceFlow_0nqcs3t',
      arithmeticMeanRuntimeInMs: 1000.0,
      firstQuartileRuntimeInMs: NaN,
      medianRuntimeInMs: 10100.5,
      thirdQuartileRuntimeInMs: NaN,
      minRuntimeInMs: NaN,
      maxRuntimeInMs: NaN
    }
    // {
    //   processModelId: 'DemoNutztierRiss',
    //   flowNodeId: 'SequenceFlow_0jc0guj',
    //   arithmeticMeanRuntimeInMs: 1000.0,
    //   firstQuartileRuntimeInMs: NaN,
    //   medianRuntimeInMs: 10100.5,
    //   thirdQuartileRuntimeInMs: NaN,
    //   minRuntimeInMs: NaN,
    //   maxRuntimeInMs: NaN,
    // },
  ];

  private _mockDataForActiveTokens: Array<DataModels.Kpi.ActiveToken> = [
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_1sy1ibw',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_0julnc5',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_0julnc5',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_0julnc5',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_0julnc5',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_0julnc5',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'Task_04fbo5q',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'EndEvent_0eie6q6',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'EndEvent_0eie6q6',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    },
    {
      processInstanceId: 'test',
      processModelId: 'heatmap_sample',
      correlationId: 'test',
      identity: {
        token: 'test',
        userId: 'test'
      },
      createdAt: new Date(),
      flowNodeId: 'EndEvent_0eie6q6',
      flowNodeInstanceId: '<flownodeinstanceidhere>',
      payload: ''
    }
  ];

  constructor(manegementApiClient: ManagementApiClientService, authenticationService: IAuthenticationService) {
    this._managementApiClient = manegementApiClient;
    this._authenticationService = authenticationService;
  }

  public setIdentity(identity: IIdentity): void {
    this._identity = identity;
  }

  public getRuntimeInformationForProcessModel(
    processModelId: string
  ): Promise<Array<DataModels.Kpi.FlowNodeRuntimeInformation>> {
    return new Promise((resolve: Function, reject: Function): void => {
      resolve(this._mockDataForHeatmapSampleProcess);
    });
  }

  public getActiveTokensForFlowNode(flowNodeId: string): Promise<Array<DataModels.Kpi.ActiveToken>> {
    return new Promise((resolve: Function, reject: Function): void => {
      const newArray: Array<DataModels.Kpi.ActiveToken> = this._mockDataForActiveTokens.filter(
        (element: DataModels.Kpi.ActiveToken) => {
          const elementIs: boolean = element.flowNodeId === flowNodeId;
          return elementIs;
        }
      );
      resolve(newArray);
    });
  }

  public getProcess(processModelId: string): Promise<DataModels.ProcessModels.ProcessModel> {
    return this._managementApiClient.getProcessModelById(this._identity, processModelId);
  }
}
