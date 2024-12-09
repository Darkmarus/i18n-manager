import * as vscode from "vscode";

export class Properties {
  private static readonly settings = {
    JSON_SPACE: "i18nJsonEditor.jsonSpace",
    LINE_ENDING: "i18nJsonEditor.lineEnding",
    SUPPORTED_FOLDERS: "i18nJsonEditor.supportedFolders",
  };

  private static getValue<T>(key: string): T | undefined {
    return vscode.workspace.getConfiguration().get<T>(key);
  }

  static get JSON_SPACE(): string | number {
    return this.getValue(this.settings.JSON_SPACE) ?? 2;
  }

  static get LINE_ENDING(): string {
    return this.getValue<string>(this.settings.LINE_ENDING) ?? "\n";
  }

  static get SUPPORTED_FOLDERS(): string[] {
    return this.getValue<string[]>(this.settings.SUPPORTED_FOLDERS) ?? ["i18n"];
  }
}
