import sqlite3 from "sqlite3";
import * as vscode from "vscode";

export class DatabaseProvider {
  private _db?: sqlite3.Database;
  private async open(): Promise<void> {
    this._db = new sqlite3.Database(
      "D:/project/omar/vscode_plugin/i18n-manager/i18n-manager/i18n-manager.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          vscode.window.showErrorMessage(
            "Error while opening database: " + err?.message
          );
          throw err;
        }
      }
    );
  }

  async exec(sql: string): Promise<void> {
    if (!this._db) {
      await this.open();
    }
    return new Promise<void>((resolve, reject) => {
      this._db!.exec(sql, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  async close(): Promise<void> {
    if (this._db) {
      return new Promise<void>((resolve, reject) => {
        this._db!.close((err) => {
          if (err) {
            reject(err);
          } else {
            this._db = undefined;
            resolve();
          }
        });
      });
    }
  }

  // use run in insert, update, delete
  async run(sql: string, params?: any[]): Promise<void> {
    if (!this._db) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      this._db!.run(sql, params, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
  async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    if (!this._db) {
      await this.open();
    }
    return new Promise<T | undefined>((resolve, reject) => {
      this._db!.get(sql, params, (err, row: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  async getAll<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this._db) {
      await this.open();
    }
    return new Promise<T[]>((resolve, reject) => {
      this._db!.all(sql, params, (err, rows: T[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async runInsertBatchTransaction(sql: string, params?: any[]): Promise<void> {
    if (!this._db) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      this._db!.serialize(() => {
        this._db!.run("BEGIN TRANSACTION");

        params?.forEach((param) => {
          this._db!.run(sql, param);
        });

        this._db!.run("COMMIT", (err) => {
          err ? reject(err) : resolve();
        });
      });
    });
  }
}
