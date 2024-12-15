import type { IBasicFilterAndPaginationEvent } from "../models/events/publish/basic-filter-and-pagination.event";

enum eventPublish {
  LOADED = "loaded",
  CHANGE_PAGE_AND_FIlTER = "change-page-filter",
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
}

export const vscodeEventPublisher = new VscodeEventPublisher();
