import type { IPagination } from "../models/pagination.interface";
import { tableProvider } from "./table-provider.svelte";

class VscodeEventListener {
  private readonly _events: { [key: string]: (data: any) => void } = {
    "refresh-table": this.updateDataTable.bind(this),
  };

  listeningEvents() {
    window.addEventListener("message", (event) => {
      const message: { command: string; data: any } = event.data;
      const func = this._events[message.command];

      if (!func) {
        throw new Error("command not found");
      }

      func && func(message.data);
    });
  }

  private updateDataTable(page: IPagination) {
    tableProvider.data = page;
  }
}

export const vscodeEventListener = new VscodeEventListener();
