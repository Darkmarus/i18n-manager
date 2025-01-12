import * as vscode from "vscode";
import type { IPagination } from "../model/pagination.interface";
import { Language } from "./../model/language.interface";

enum EventsPublish {
  REFRESH_TABLE = "refresh-table",
  GET_LANGUAGES = "load-languages",
  FILTER_SINGLE = "filter-single",
  FILTER_TO_TAGS = "filter-tags",
  REFRESH_SUGGESTIONS = "refresh-suggestions",
}
export class EventPublishProvider {
  private readonly _webviewPanel: vscode.WebviewPanel;
  constructor(webviewPanel: vscode.WebviewPanel) {
    this._webviewPanel = webviewPanel;
  }

  refreshDataPublish(data: IPagination) {
    this._webviewPanel.webview.postMessage({
      command: EventsPublish.REFRESH_TABLE,
      data,
    });
  }

  languagesPublish(languages: Language[]) {
    this._webviewPanel.webview.postMessage({
      command: EventsPublish.GET_LANGUAGES,
      data: languages.map((lang, index) => ({
        id: index,
        filename: lang.filename,
      })),
    });
  }

  filterSinglePublish(rowIndex: number, tagIndex: number) {
    this._webviewPanel.webview.postMessage({
      command: EventsPublish.FILTER_SINGLE,
      data: { rowIndex, tagIndex },
    });
  }

  filterTagsPublish(rowIndex: number, tagIndex: number) {
    this._webviewPanel.webview.postMessage({
      command: EventsPublish.FILTER_TO_TAGS,
      data: { rowIndex, tagIndex },
    });
  }
  suggestionsPublish(suggestions: string[]) {
    this._webviewPanel.webview.postMessage({
      command: EventsPublish.REFRESH_SUGGESTIONS,
      data: suggestions,
    });
  }
}
