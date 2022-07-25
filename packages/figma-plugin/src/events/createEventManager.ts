type StringToFunctionObject = Record<string, (...args: unknown[]) => void>;

export function createEventManager<T extends StringToFunctionObject>(events: T) {
  type EventName = Extract<keyof T, string>;
  type EventHandler<Name extends EventName> = T[Name];
  type EventParameters<Name extends EventName> = Parameters<EventHandler<Name>>;

  type FigmaMessage = { type: EventName; parameters: EventParameters<EventName> };

  function postToUiThread<Name extends EventName>(name: Name, parameters?: EventParameters<Name>) {
    figma.ui.postMessage({ type: name, parameters });
  }

  function postToNativeThread<Name extends EventName>(
    name: Name,
    parameters?: EventParameters<Name>
  ) {
    if (window) {
      window.parent.postMessage(
        {
          pluginMessage: {
            type: name,
            parameters,
          },
        },
        '*'
      );
    }
  }

  function parseMessage(msg: FigmaMessage) {
    for (const [event, handler] of Object.entries(events)) {
      if (msg.type === event) {
        handler();
      }
    }
  }

  function initNativeThread() {
    figma.ui.on('message', async (msg: FigmaMessage) => {
      parseMessage(msg);
    });
  }

  function initUiThread() {
    if (window) {
      window.onmessage = function (event: MessageEvent) {
        const msg: FigmaMessage = event.data.pluginMessage;
        parseMessage(msg);
      };
    }
  }

  return {
    initNativeThread,
    initUiThread,
    postToNativeThread,
    postToUiThread,
  };
}
