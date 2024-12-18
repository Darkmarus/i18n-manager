import sqlite3 from "sqlite3";
export class DatabaseProvider {
  private readonly _db: sqlite3.Database;
  constructor() {
    this._db = new sqlite3.Database("i18n-manager.db");
  }

  private async migrate() {
    await this.exec(`
    CREATE TABLE IF NOT EXISTS language (
    id        INTEGER PRIMARY KEY,
    json_code TEXT    UNIQUE NOT NULL,
    data      TEXT    NOT NULL,
    lang      TEXT    NOT NULL);`);
  }

  async exec(sql: string) {
    return new Promise((resolve, reject) => {
      try {
        this._db.exec(sql, (err) => (err ? reject(err) : resolve(true)));
      } catch (error) {
        console.error(error);
      } finally {
        this._db.close();
      }
    });
  }
}
