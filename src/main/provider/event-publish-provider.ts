import { Language } from "./../model/language.interface";
import * as vscode from "vscode";
import type { IPagination } from "../model/pagination.interface";

enum EventsPublish {
  REFRESH_TABLE = "refresh-table",
  GET_LANGUAGES = "load-languages",
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
}
