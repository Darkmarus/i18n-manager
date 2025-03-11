import * as vscode from 'vscode';
import type { TableManager } from '../controller/table-manager';

export class EventListenerProvider {
  private readonly _webviewPanel: vscode.WebviewPanel;
  private readonly _tableManager: TableManager;

  private readonly _eventHandle: { [key: string]: (data: any) => void } = {
    loaded: this.loadData,
    'change-page-filter': this.filterAndPaginate,
    'change-language': this.changeLanguage,
    'change-strict-filter': this.changeStrictFilter,
    'change-missing-filter': this.changeMissingFilter,
    'delete-property': this.deleteProperty,
    'change-suggestion': this.changeSuggestion,
    'merge-properties': this.mergeProperties,
    'change-changed-filter': this.changeChangedFilter,
  };

  constructor(TableManager: TableManager, webviewPanel: vscode.WebviewPanel) {
    this._tableManager = TableManager;
    this._webviewPanel = webviewPanel;
  }

  watchEvents() {
    this._webviewPanel.webview.onDidReceiveMessage((message) => {
      const handle = this._eventHandle[message.type];
      if (handle) {
        handle.bind(this)(message);
      } else {
        console.error('Event not found');
      }
    });
  }
  private loadData() {
    this._tableManager.loadData();
  }
  private filterAndPaginate(message: any) {
    this._tableManager.filterAndPaginate(message.data);
  }
  private changeLanguage(message: any) {
    this._tableManager.changeLanguage(message.data);
  }
  private changeStrictFilter(message: any) {
    this._tableManager.changeStrictFilter(message.data);
  }
  private changeMissingFilter(message: any) {
    this._tableManager.changePropertiesImplemented(message.data);
  }
  private deleteProperty(message: any) {
    this._tableManager.deleteProperty(message.data);
  }
  private changeSuggestion(message: any) {
    this._tableManager.changeSuggestion(message.text);
  }
  private mergeProperties(message: any) {
    this._tableManager.mergeProperties(message.data, message.langIndex);
  }
  private changeChangedFilter(message: any) {
    this._tableManager.changeChangedFilter(message.data);
  }
}
