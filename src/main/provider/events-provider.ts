import type { TableManager } from "@main/controller/table-manager";
import type { IPagination } from "@main/model/pagination.interface";
import * as vscode from "vscode";

enum EventsListener {
  LOADED = "loaded",
}

enum EventsPost {
  REFRESH_TABLE = "refresh-table",
}

export class EventsProvider {
  private readonly _webviewPanel: vscode.WebviewPanel;
  private readonly _tableManager: TableManager;

  constructor(TableManager: TableManager, webviewPanel: vscode.WebviewPanel) {
    this._tableManager = TableManager;
    this._webviewPanel = webviewPanel;
  }

  watchEvents() {
    this._webviewPanel.webview.onDidReceiveMessage((message) => {
      if (message.type === EventsListener.LOADED) {
        this._tableManager.loadData();
      }
    });
  }

  refreshDataPublish(data: IPagination) {
    this._webviewPanel.webview.postMessage({
      command: EventsPost.REFRESH_TABLE,
      data,
    });
  }
}
