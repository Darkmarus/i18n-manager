import * as vscode from "vscode";
import * as path from "path";

export class VscodeUtil {
  private static _context?: vscode.ExtensionContext;

  static loadContext(context: vscode.ExtensionContext) {
    this._context = context;
  }
  static resolverUri(file: string): vscode.Uri {
    const folderPublic = "media";

    if (!this._context) {
      throw new Error("Context is not loaded.");
    }

    const uri = vscode.Uri.file(
      path.join(this._context.extensionPath, folderPublic, file)
    );

    return uri;
  }
}
