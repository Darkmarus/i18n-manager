import * as vscode from 'vscode';
import { TableManager } from '../controller/table-manager';
import { LanguageEntityManager } from '../persistence/language-entity-manager';
import { JsonManagerProvider } from '../provider/json-manager-provider';
import { DatabaseProvider } from './database-provider';
import { TableProvider } from './table-provider';

const appId = 'i18n-manager-43A78A5B43B33AD8';
export class CommandProvider {
  private _tableManager: TableManager | undefined = undefined;
  constructor(private readonly _context: vscode.ExtensionContext) {}

  register(): vscode.Disposable[] {
    return [
      vscode.commands.registerCommand(
        `${appId}.openManagerWIthSelection`,
        this.openTableManagerWithSelection.bind(this)
      ),
      vscode.commands.registerCommand(`${appId}.filterSingleTag`, this.filterSingleTag.bind(this)),
      vscode.commands.registerCommand(`${appId}.filterAllTags`, this.filterAllTags.bind(this)),
    ];
  }

  private openTableManagerWithSelection(contextSelection: vscode.Uri, allSelections: vscode.Uri[]) {
    if (!allSelections || allSelections.length === 0) {
      vscode.window.showWarningMessage('No files selected.');
      return;
    }

    const onlyJsonFiles = allSelections.filter((f) => f.fsPath.endsWith('.json'));

    if (this._tableManager) {
      this._tableManager.activeView();
    } else {
      const databaseProvider = new DatabaseProvider();
      const jsonManagerProvider = new JsonManagerProvider(onlyJsonFiles);
      const tableProvider = new TableProvider(databaseProvider, new LanguageEntityManager(databaseProvider));

      this._tableManager = new TableManager(this._context, jsonManagerProvider, tableProvider);
      this._tableManager.init(appId);
      this._tableManager.onClosed = this.onClosed.bind(this);
    }
  }
  private onClosed() {
    this._tableManager = undefined;
  }

  private filterSingleTag(...args: { rowIndex: number; tagIndex: number }[]) {
    if (args.length === 0) {
      vscode.window.showWarningMessage('No selected tag');
    } else {
      const { rowIndex, tagIndex } = args[0];
      this._tableManager?._tableProvider.filterSingle(rowIndex, tagIndex);
    }
  }

  private filterAllTags(...args: { rowIndex: number; tagIndex: number }[]) {
    if (args.length === 0) {
      vscode.window.showWarningMessage('No selected tag');
    } else {
      const { rowIndex, tagIndex } = args[0];
      this._tableManager?._tableProvider.filterTags(rowIndex, tagIndex);
    }
  }
}
