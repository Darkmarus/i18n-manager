import { DatabaseProvider } from "../provider/database-provider";
import type { LanguageEntity } from "./entity/language-entity.interface";

export class LanguageEntityManager {
  constructor(private readonly _databaseProvider: DatabaseProvider) {}

  async saveAll(languageEntity: LanguageEntity[]) {
    const sql = `INSERT INTO language (data, lang) VALUES (?, ?);`;
    this._databaseProvider.runInsertBatchTransaction(
      sql,
      languageEntity.map((l) => [l.data, l.lang])
    );
  }

  filterPagination(
    filter: string[],
    sizeLanguages: number,
    lang: string,
    page: number,
    pageSize: number,
    modeOrderStrict: boolean,
    propertiesImplemented: boolean
  ): Promise<LanguageEntity[]> {
    const offset = (page - 1) * pageSize;
    let sql: string = "";
    let params: any[] = [];
    const conditionsFilterImplemented = this.conditionsFilterImplemented(
      propertiesImplemented,
      sizeLanguages
    );
    if (filter.length > 0) {
      const [conditions, valueConditions] = this.conditionsFilter(
        filter,
        modeOrderStrict
      );
      sql = `SELECT * FROM language WHERE ${conditions} AND lang = ? ${conditionsFilterImplemented} LIMIT ? OFFSET ?;`;
      params = [...valueConditions, lang, pageSize, offset];
    } else {
      sql = `SELECT * FROM language WHERE lang = ? ${conditionsFilterImplemented} LIMIT ? OFFSET ?;`;
      params = [lang, pageSize, offset];
    }
    return this._databaseProvider.getAll<LanguageEntity>(sql, params);
  }

  countFilterPagination(
    filter: string[],
    sizeLanguages: number,
    lang: string,
    modeOrderStrict: boolean,
    propertiesImplemented: boolean
  ): Promise<{ total: number } | undefined> {
    let sql: string = "";
    let params: any[] = [];
    const conditionsFilterImplemented = this.conditionsFilterImplemented(
      propertiesImplemented,
      sizeLanguages
    );
    if (filter.length > 0) {
      const [conditions, valueConditions] = this.conditionsFilter(
        filter,
        modeOrderStrict
      );
      sql = `SELECT COUNT(*) AS total FROM language WHERE ${conditions} AND lang = ? ${conditionsFilterImplemented};`;
      params = [...valueConditions, lang];
    } else {
      sql = `SELECT COUNT(*) AS total FROM language WHERE lang = ? ${conditionsFilterImplemented};`;
      params = [lang];
    }

    return this._databaseProvider.get<{ total: number }>(sql, params);
  }

  private conditionsFilterImplemented(
    propertiesImplemented: boolean,
    numberLanguages: number
  ) {
    if (propertiesImplemented) {
      return `AND json_extract( data, '$.path') IN (
        SELECT json_extract(l2.data, '$.path') FROM language l2
        GROUP BY json_extract(l2.data, '$.path') HAVING ${numberLanguages} > COUNT(*)
      )`;
    }
    return "";
  }

  private conditionsFilter(
    filter: string[],
    modeOrderStrict: boolean
  ): [string, any[]] {
    if (filter.length > 0) {
      if (modeOrderStrict) {
        const valueConditions =
          '%"' +
          filter.map((filtro) => filtro.toUpperCase()).join('","') +
          '"%';
        return [
          `UPPER(json_extract(data, '$.path')) LIKE ?`,
          [valueConditions],
        ];
      } else {
        const conditions = filter
          .map(() => `UPPER(json_extract(data, '$.path')) LIKE ?`)
          .join(" OR ");
        const valueConditions = filter.map(
          (filtro) => `%${filtro.toUpperCase()}%`
        );
        return [conditions, valueConditions];
      }
    }
    return ["", []];
  }
}
