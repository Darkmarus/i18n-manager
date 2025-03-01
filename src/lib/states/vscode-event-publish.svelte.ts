import type { IBasicFilterAndPaginationEvent } from '../models/events/publish/basic-filter-and-pagination.event';

enum eventPublish {
  LOADED = 'loaded',
  CHANGE_PAGE_AND_FIlTER = 'change-page-filter',
  CHANGE_LANGUAGE = 'change-language',
  CHANGE_STRICT_FILTER = 'change-strict-filter',
  CHANGE_MISSING_FILTER = 'change-missing-filter',
  DELETE_PROPERTY = 'delete-property',
  CHANGE_SUGGESTION = 'change-suggestion',
  MERGE_PROPERTIES = 'merge-properties',
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

  changeStrictFilter(data: boolean) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_STRICT_FILTER,
      data,
    });
  }

  changeMissingFilter(data: boolean) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_MISSING_FILTER,
      data,
    });
  }

  deleteProperty(id: number, langs: string[], page: number) {
    this._vscode.postMessage({
      type: eventPublish.DELETE_PROPERTY,
      data: { id, langs, page },
    });
  }

  changeSuggestion(text: string) {
    this._vscode.postMessage({
      type: eventPublish.CHANGE_SUGGESTION,
      text,
    });
  }
  sendMargeProperties(data: any, langIndex: number) {
    this._vscode.postMessage({
      type: eventPublish.MERGE_PROPERTIES,
      data,
      langIndex,
    });
  }
}

export const vscodeEventPublisher = new VscodeEventPublisher();
