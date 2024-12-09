import { TableManager } from "@main/controller/table-manager";
import { JsonManagerProvider } from "@main/provider/json-manager-provider";
import * as vscode from "vscode";

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

    const tableManager = new TableManager(
      this._context,
      new JsonManagerProvider(this._context, onlyJsonFiles)
    );
    tableManager.init();
  }
}
