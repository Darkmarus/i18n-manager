import type { IPagination } from "../model/pagination.interface";
import * as vscode from "vscode";

enum EventsPublish {
  REFRESH_TABLE = "refresh-table",
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
}
