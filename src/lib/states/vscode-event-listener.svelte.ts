import type { ILanguage } from "../models/language.interface";
import type { IPagination } from "../models/pagination.interface";
import { tableProvider } from "./table-provider.svelte";

class VscodeEventListener {
  private readonly _events: { [key: string]: (data: any) => void } = {
    "refresh-table": this.updateDataTable.bind(this),
    "load-languages": this.loadLanguages.bind(this),
  };

  listeningEvents() {
    window.addEventListener("message", (event) => {
      const message: { command: string; data: any } = event.data;
      console.log(
        "🚀 ~ VscodeEventListener ~ window.addEventListener ~ command: string; data: any:",
        message.command,
        message.data
      );
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

  private loadLanguages(data: ILanguage[]) {
    tableProvider.languages = data;
  }
}

export const vscodeEventListener = new VscodeEventListener();
