import type { IBasicFilterAndPaginationEvent } from "../models/events/publish/basic-filter-and-pagination.event";

enum eventPublish {
  LOADED = "loaded",
  CHANGE_PAGE_AND_FIlTER = "change-page-filter",
  CHANGE_LANGUAGE = "change-language",
  CHANGE_STRICT_FILTER_MODE = "change-strict-filter-mode",
}
class VscodeEventPublisher {
  private readonly _vscode = acquireVsCodeApi();

  sendOnloadEvent() {
    this._vscode.postMessage({ type: eventPublish.LOADED });
  }

  sendChangePageEvent(data: IBasicFilterAndPaginationEvent) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_PAGE_AND_FIlTER,
      data,
    });
  }

  changeLanguage(data: number) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_LANGUAGE,
      data,
    });
  }

  changeStrictFilterMode(data: boolean) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_STRICT_FILTER_MODE,
      data,
    });
  }
}

export const vscodeEventPublisher = new VscodeEventPublisher();
