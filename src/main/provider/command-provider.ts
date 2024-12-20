import * as vscode from "vscode";
import { TableManager } from "../controller/table-manager";
import { JsonManagerProvider } from "../provider/json-manager-provider";
import { DatabaseProvider } from "./database-provider";
import { LanguageEntityManager } from "../persistence/language-entity-manager";
import { TableProvider } from "./table-provider";

export class CommandProvider {
  constructor(private readonly _context: vscode.ExtensionContext) {}

  register(): vscode.Disposable[] {
    return [
      vscode.commands.registerCommand(
        "i18n-manager.openManagerWIthSelection",
        this.openTableManagerWithSelection.bind(this)
      ),
    ];
  }

  private openTableManagerWithSelection(
    contextSelection: vscode.Uri,
    allSelections: vscode.Uri[]
  ) {
    if (!allSelections || allSelections.length === 0) {
      vscode.window.showWarningMessage("No files selected.");
      return;
    }

    const onlyJsonFiles = allSelections.filter((f) =>
      f.fsPath.endsWith(".json")
    );

    // databaseProvider,
    //   new LanguageEntityManager(databaseProvider

    const databaseProvider = new DatabaseProvider();
    const jsonManagerProvider = new JsonManagerProvider(onlyJsonFiles);
    const tableProvider = new TableProvider(
      databaseProvider,
      new LanguageEntityManager(databaseProvider)
    );

    const tableManager = new TableManager(
      this._context,
      jsonManagerProvider,
      tableProvider
    );
    tableManager.init();
  }
}
