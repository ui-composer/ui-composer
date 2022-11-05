import { eventManager } from './events';

export const init = eventManager.initUiThread;
export const postMessage = eventManager.postToNativeThread;
