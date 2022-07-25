import { eventManager } from './events';

export const init = eventManager.initNativeThread;
export const postMessage = eventManager.postToUiThread;
