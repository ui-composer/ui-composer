import { EventEmitter, NativeModulesProxy, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Chart.web.ts
// and on native platforms to Chart.ts
import Module from './ChartModule';
import ChartView from './ChartView';
import { ChangeEventPayload, ChartViewProps } from './types';

export type { ChangeEventPayload, ChartViewProps };

export const ChartModule = {
  // Get the native constant value.
  PI: Module.PI,
  hello: function hello(): string {
    return Module.hello();
  },
  setValueAsync: async function setValueAsync(value: string) {
    return await Module.setValueAsync(value);
  },
  emitter: new EventEmitter(Module ?? NativeModulesProxy.Chart),
  addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
    return this.emitter.addListener<ChangeEventPayload>('onChange', listener);
  },
};

export { ChartView };
