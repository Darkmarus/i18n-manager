import type { Language } from "@main/model/language.interface";
import type { IPagination } from "@main/model/pagination.interface";
import { VscodeUtil } from "@main/util/vscode-util";
import * as fs from "fs";
import * as vscode from "vscode";
import { IProperty } from "./../model/pagination.interface";

export class JsonManagerProvider {
  private readonly _languages: Language[] = [];
  private _flags: any;
  private _languageDefault = -1;
  constructor(
    private readonly _context: vscode.ExtensionContext,
    private readonly _files: vscode.Uri[]
  ) {}

  async init() {
    this.loadFiles(this._files);
    await this.loadFlags();
    await this.selectedLanguage();
  }

  private async loadFlags() {
    this._flags = {};
    const file = VscodeUtil.resolverUri("flags.json");

    const rawData = fs.readFileSync(file.fsPath);
    let jsonData = this.stripBom(rawData.toString());
    const flags: { images: string[] } = JSON.parse(jsonData);
    flags.images.forEach((f) => {
      const key = f.split(".").shift() ?? "";
      this._flags[key] = VscodeUtil.resolverUri(f).path;
    });
  }

  private async selectedLanguage() {
    const options: vscode.QuickPickItem[] = this._languages.map((l) => ({
      label: l.filename,
    }));
    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "The selected a file will be the default:",
    });

    if (selected) {
      vscode.window.showInformationMessage(`Selected: ${selected.label}.`);
      this._languageDefault = this._languages.findIndex(
        (l) => l.filename === selected.label
      );
    } else {
      vscode.window.showErrorMessage("No selected a file.");
      throw new Error("No selected.");
    }
  }

  private loadFiles(files: vscode.Uri[]) {
    files.forEach((file) => {
      const rawData = fs.readFileSync(file.fsPath);
      let jsonData = this.stripBom(rawData.toString());

      const filename = file.fsPath.split("\\").pop() ?? "";
      const data = JSON.parse(jsonData);

      this._languages.push({
        name: filename.split(".").shift() ?? "",
        filename,
        fsPath: file.fsPath,
        data,
        flatten: this.flattenJSON(data),
      });
    });
  }

  flattenJSON(obj: any, path: string[] = []): IProperty[] {
    const result: IProperty[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = [...path, key];
        const value = obj[key];

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          result.push(...this.flattenJSON(value, newPath));
        } else {
          result.push({ path: newPath, value });
        }
      }
    }

    return result;
  }

  filterAndPaginate(filter: string[], page = 1, size = 18): IPagination {
    const data = this._languages[this._languageDefault].flatten;

    if (!Array.isArray(data)) {
      throw new Error("El parámetro `data` debe ser un arreglo.");
    }

    if (size <= 0 || page <= 0) {
      throw new Error("Los parámetros `size` y `page` deben ser mayores a 0.");
    }

    const filteredData =
      filter.length > 0
        ? data.filter((item) =>
            item.path.some((part) =>
              filter.some((f) => part.toLowerCase().includes(f.toLowerCase()))
            )
          )
        : data;

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    return {
      data: filteredData.slice(startIndex, endIndex),
      page,
      size,
      totalPages: Math.ceil(filteredData.length / size),
      totalElements: filteredData.length,
    };
  }

  unflattenJSON(obj: any) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split(".");
      let current = result;
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          current[keys[i]] = value;
        } else {
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
      }
    }
    return result;
  }

  getLanguage(): Language {
    return this._languages[this._languageDefault];
  }
  private stripBom(str: string) {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string, got ${typeof str}`);
    }

    // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
    // conversion translates it to FEFF (UTF-16 BOM).
    if (str.charCodeAt(0) === 0xfeff) {
      return str.slice(1);
    }

    return str;
  }
}
