import * as vscode from "vscode";
import type { TableManager } from "../controller/table-manager";

enum EventsListener {
  LOADED = "loaded",
  CHANGE_PAGE_AND_FIlTER = "change-page-filter",
  CHANGE_LANGUAGE = "change-language",
  CHANGE_STRICT_FILTER_MODE = "change-strict-filter-mode",
}

export class EventListenerProvider {
  private readonly _webviewPanel: vscode.WebviewPanel;
  private readonly _tableManager: TableManager;

  constructor(TableManager: TableManager, webviewPanel: vscode.WebviewPanel) {
    this._tableManager = TableManager;
    this._webviewPanel = webviewPanel;
  }

  watchEvents() {
    this._webviewPanel.webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case EventsListener.LOADED:
          this._tableManager.loadData();
          break;
        case EventsListener.CHANGE_PAGE_AND_FIlTER:
          this._tableManager.filterAndPaginate(message.data);
          break;
        case EventsListener.CHANGE_LANGUAGE:
          this._tableManager.changeLanguage(message.data);
          break;
        case EventsListener.CHANGE_STRICT_FILTER_MODE:
          this._tableManager.changeStrictFilterMode(message.data);
          break;
        default:
          console.log("Event not found", message.type);
          break;
      }
    });
  }
}