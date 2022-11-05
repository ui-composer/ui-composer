import { createEventManager } from './createEventManager';

const events = {
  loaded: () => {
    console.log('ui has been loaded');
  },
  close: () => {
    console.log('ui is closing');
    figma.closePlugin();
  },
};

export const eventManager = createEventManager(events);
