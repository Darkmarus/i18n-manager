import * as fs from 'fs';
import * as vscode from 'vscode';
import { VscodeUtil } from '../util/vscode-util';
import { Language } from './../model/language.interface';
import { type IPropertyRaw } from './../model/pagination.interface';

export class JsonManagerProvider {
  private _flags: any;
  constructor(private readonly _files: vscode.Uri[]) {}

  private async loadFlags() {
    this._flags = {};
    const file = VscodeUtil.resolverUri('flags.json');

    const rawData = fs.readFileSync(file.fsPath);
    let jsonData = this.stripBom(rawData.toString());
    const flags: { images: string[] } = JSON.parse(jsonData);
    flags.images.forEach((f) => {
      const key = f.split('.').shift() ?? '';
      this._flags[key] = VscodeUtil.resolverUri(f).path;
    });
  }

  async loadFiles(): Promise<[Language, IPropertyRaw[]][] | null> {
    for (const batch of this.splitArray(this._files, 5)) {
      const promises = batch.map(async (file) => {
        const rawData = fs.readFileSync(file.fsPath);
        let jsonData = this.stripBom(rawData.toString());

        const filename = file.fsPath.split('\\').pop() ?? '';
        const data = JSON.parse(jsonData);

        return [
          {
            name: filename.split('.').shift() ?? '',
            filename,
            fsPath: file.fsPath,
          } as Language,
          this.flattenJSON(data),
        ];
      });

      return Promise.all(promises) as any;
    }

    return Promise.resolve(null);
  }

  private splitArray(array: any[], batchSize: number) {
    const subArrays = [];
    for (let i = 0; i < array.length; i += batchSize) {
      subArrays.push(array.slice(i, i + batchSize));
    }
    return subArrays;
  }

  flattenJSON(obj: any, path: string[] = []): IPropertyRaw[] {
    const result: IPropertyRaw[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = [...path, key];
        const value = obj[key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          result.push(...this.flattenJSON(value, newPath));
        } else {
          result.push({ path: newPath, value });
        }
      }
    }

    return result;
  }

  unflattenJSON(obj: any) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split('.');
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

  private stripBom(str: string) {
    if (typeof str !== 'string') {
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
