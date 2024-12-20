import * as fs from "fs";
import * as vscode from "vscode";
import type { Language } from "../model/language.interface";
import { LanguageEntityManager } from "../persistence/language-entity-manager";
import { VscodeUtil } from "../util/vscode-util";
import { IProperty, type IPagination } from "./../model/pagination.interface";
import { DatabaseProvider } from "./database-provider";

export class JsonManagerProvider {
  private readonly _languages: Language[] = [];
  private _flags: any;
  private _languageDefault = -1;
  constructor(
    private readonly _files: vscode.Uri[],
    private readonly _databaseProvider: DatabaseProvider,
    private readonly _languageEntityManager: LanguageEntityManager
  ) {}

  async init() {
    await this._databaseProvider.exec(`
      CREATE TABLE IF NOT EXISTS language (
        id        INTEGER PRIMARY KEY,
        data      TEXT    NOT NULL,
        lang      TEXT    NOT NULL);`);
    // await this._databaseProvider.exec(`DELETE FROM language;`);
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
      this.savedDataInBatch(filename, this.flattenJSON(data));

      this._languages.push({
        name: filename.split(".").shift() ?? "",
        filename,
        fsPath: file.fsPath,
      });
    });
  }

  private savedDataInBatch(filename: string, data: IProperty[]) {
    let currentBatch: IProperty[] = [];

    for (let i = 0; i < data.length; i++) {
      currentBatch.push(data[i]);
      if (currentBatch.length === 20 || i === data.length - 1) {
        this._languageEntityManager.saveAll(
          currentBatch.map((l) => ({
            data: JSON.stringify(l),
            lang: filename,
          }))
        );
        currentBatch = [];
      }
    }
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

  getLanguageDefault(): Language {
    return this._languages[this._languageDefault];
  }

  async filterAndPaginate(
    filter: string[],
    modeOrderStrict: boolean,
    page = 1,
    size = 18
  ): Promise<IPagination> {
    if (size <= 0 || page <= 0) {
      throw new Error("Los parámetros `size` y `page` deben ser mayores a 0.");
    }

    const filteredData = await this._languageEntityManager.filterPagination(
      filter,
      this.getLanguageDefault().filename,
      page,
      size,
      modeOrderStrict
    );

    const totalElements = (
      (await this._languageEntityManager.countFilterPagination(
        filter,
        this.getLanguageDefault().filename,
        modeOrderStrict
      )) || { total: 0 }
    ).total;

    const pageData = {
      data: filteredData.map((l) => JSON.parse(l.data)),
      page,
      size,
      totalPages: Math.ceil(totalElements / size),
      totalElements,
    };
    return pageData;
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

  async closedDb() {
    await this._databaseProvider.close();
  }
}
