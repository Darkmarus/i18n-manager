import type { ILanguage } from "../models/language.interface";
import type { IPagination } from "../models/pagination.interface";
import { suggestionProvider } from "./suggestion-provider.svelte";
import { tableProvider } from "./table-provider.svelte";

class VscodeEventListener {
  private readonly _events: { [key: string]: (data: any) => void } = {
    "refresh-table": this.updateDataTable.bind(this),
    "load-languages": this.loadLanguages.bind(this),
    "filter-single": this.changeSingleFilter.bind(this),
    "filter-tags": this.changeTagsFilter.bind(this),
    "refresh-suggestions": this.updateSuggestions.bind(this),
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
    tableProvider.pagination = page;
  }

  private loadLanguages(data: ILanguage[]) {
    tableProvider.languages = data;
  }
  private changeSingleFilter(data: { rowIndex: number; tagIndex: number }) {
    const { rowIndex, tagIndex } = data;
    const item = tableProvider.pagination?.data[rowIndex];
    if (item) {
      const tag = item.path[tagIndex];
      tableProvider.strictFilter = false;
      tableProvider.changeFilter([tag]);
    }
  }
  private changeTagsFilter(data: { rowIndex: number; tagIndex: number }) {
    const { rowIndex, tagIndex } = data;
    const item = tableProvider.pagination?.data[rowIndex];
    if (item) {
      const tags = item.path.slice(0, tagIndex + 1);
      tableProvider.strictFilter = true;
      tableProvider.changeFilter(tags);
    }
  }

  private updateSuggestions(data: string[]) {
    suggestionProvider.data = data;
  }
}

export const vscodeEventListener = new VscodeEventListener();
