import { DatabaseProvider } from "../provider/database-provider";
import type { LanguageEntity } from "./entity/language-entity.interface";

export class LanguageEntityManager {
  constructor(private readonly _databaseProvider: DatabaseProvider) {}

  async saveAll(languageEntity: LanguageEntity[]) {
    const sql = `INSERT INTO language (data, lang, status) VALUES (?, ?, ?);`;
    await this._databaseProvider.transaction(
      sql,
      languageEntity.map((l) => [l.data, l.lang, l.status])
    );
  }

  async createdOrUpdated(languageEntity: LanguageEntity[]) {
    const sql = `INSERT INTO language (data, lang, status) VALUES (?, ?, ?)
    ON CONFLICT DO UPDATE SET
        data = excluded.data,
        lang = excluded.lang,
        status = 'MODIFIED';`;
    this._databaseProvider.transaction(
      sql,
      languageEntity.map((l) => [l.data, l.lang, l.status])
    );
  }
  async delete(data: { id: number; langs: string[] }) {
    const sql = `WITH auxQuery AS (
        SELECT json_extract(data, '$.path') AS path FROM language WHERE id = ?
    )
    UPDATE language SET status = 'DELETED' WHERE id in (
        SELECT id FROM language
        INNER JOIN auxQuery ON json_extract(language.data, '$.path') = auxQuery.path
        WHERE language.lang in (${data.langs.map(() => "?").join(",")})
    );`;
    await this._databaseProvider.run(sql, [data.id, ...data.langs]);
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
      sql = `SELECT * FROM language WHERE ${conditions} AND lang = ? ${conditionsFilterImplemented} AND status IS NOT 'DELETED' LIMIT ? OFFSET ?;`;
      params = [...valueConditions, lang, pageSize, offset];
    } else {
      sql = `SELECT * FROM language WHERE lang = ? ${conditionsFilterImplemented} AND status IS NOT 'DELETED' LIMIT ? OFFSET ?;`;
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
      sql = `SELECT COUNT(*) AS total FROM language WHERE ${conditions} AND lang = ? ${conditionsFilterImplemented} AND status IS NOT 'DELETED';`;
      params = [...valueConditions, lang];
    } else {
      sql = `SELECT COUNT(*) AS total FROM language WHERE lang = ? ${conditionsFilterImplemented} AND status IS NOT 'DELETED';`;
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
          '*"' + filter.map((filtro) => filtro).join('","') + '"*';
        return [`json_extract(data, '$.path') GLOB ?`, [valueConditions]];
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
  async filterSuggestion(value: string, size: number): Promise<string[]> {
    if (!value) {
      return [];
    }
    const sql = `SELECT DISTINCT value FROM language, json_each( language.data, '$.path' ) WHERE value LIKE '%${
      value || ""
    }%' LIMIT ?;`;
    return (
      (
        await this._databaseProvider.getAll<{ value: string }>(sql, [size])
      )?.map((r) => r.value) || []
    );
  }
}
