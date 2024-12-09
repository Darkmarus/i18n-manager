enum event {
  LOADED = "loaded",
  sendOnloadEvent = "sendOnloadEvent",
}

class VscodeEvents {
  private readonly _vscode = acquireVsCodeApi();
  dataTable: any = $state(null);

  private readonly _events: { [key: string]: (data: any) => void } = {
    "refresh-table": this.updateDataTable,
  };

  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("message", (event) => {
      const message: { command: string; data: any } = event.data;
      const func = this._events[message.command];

      if (!func) {
        throw new Error("command not found");
      }

      func && func(message.data);
    });
  }

  private updateDataTable(data: any) {
    // this.dataTable = data;
  }

  sendOnloadEvent() {
    this._vscode.postMessage({ type: event.LOADED });
  }
}

export const vscodeEvents = new VscodeEvents();
