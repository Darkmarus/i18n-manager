import type { Language } from "../model/language.interface";
import type { IProperty } from "../model/pagination.interface";
import type { LanguageEntityManager } from "../persistence/language-entity-manager";
import type { DatabaseProvider } from "./database-provider";
import type { EventPublishProvider } from "./event-publish-provider";

export class TableProvider {
  private readonly _languages: Language[] = [];
  private _languageDefault = 0;
  private _strictFilter: boolean = false;
  private _missingFilter: boolean = false;
  private _page: number = 1;
  private _size: number = 18;
  private _filter: string[] = [];
  private _eventPublishProvider?: EventPublishProvider;
  constructor(
    private readonly _databaseProvider: DatabaseProvider,
    private readonly _languageEntityManager: LanguageEntityManager
  ) {}

  async init() {
    await this._databaseProvider.exec(`
        CREATE TABLE IF NOT EXISTS language (
          id        INTEGER PRIMARY KEY,
          data      TEXT    NOT NULL,
          lang      TEXT    NOT NULL,
          deleted   BOOLEAN NOT NULL DEFAULT 0);`);
    await this._databaseProvider.exec(`DELETE FROM language;`);
  }

  async loadedData() {
    this._eventPublishProvider?.languagesPublish(this.languages);

    this.filterAndPaginate(
      this._filter,
      this._strictFilter,
      this._page,
      this._size
    );
  }
  async changeLanguage(lang: number) {
    this._languageDefault = lang;

    this.filterAndPaginate(this._filter, this._strictFilter, 1, this._size);
  }
  changeStrictFilter(strictFilterMode: boolean) {
    this.filterAndPaginate(this._filter, strictFilterMode, 1, this._size);
  }
  changeMissingFilter(data: boolean) {
    this._missingFilter = data;
    this.filterAndPaginate(this._filter, this._strictFilter, 1, this._size);
  }
  async deleteProperty(id: number, page: number) {
    await this._languageEntityManager.delete(id);
    await this.filterAndPaginate(
      this._filter,
      this._strictFilter,
      page,
      this._size
    );
  }

  async savedDataInBatch(filename: string, data: IProperty[]) {
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

  async filterAndPaginate(
    filter: string[],
    strictFilter: boolean,
    page: number,
    size: number
  ) {
    if (size <= 0 || page <= 0) {
      throw new Error("Los parámetros `size` y `page` deben ser mayores a 0.");
    }
    this._filter = filter;
    this._strictFilter = strictFilter;
    this._size = size;
    this._page = page;

    const filteredData = await this._languageEntityManager.filterPagination(
      this._filter,
      this.languages.length,
      this.getLanguageDefault().filename,
      this._page,
      this._size,
      this._strictFilter,
      this._missingFilter
    );

    const totalElements = (
      (await this._languageEntityManager.countFilterPagination(
        this._filter,
        this.languages.length,
        this.getLanguageDefault().filename,
        this._strictFilter,
        this._missingFilter
      )) || { total: 0 }
    ).total;

    const pageData = {
      data: filteredData.map((l) => ({ id: l.id, ...JSON.parse(l.data) })),
      page,
      size,
      totalPages: Math.ceil(totalElements / size),
      totalElements,
    };
    this._eventPublishProvider?.refreshDataPublish(pageData);
  }

  getLanguageDefault(): Language {
    return this._languages[this._languageDefault];
  }
  get languages() {
    return this._languages;
  }
  async closedDb() {
    await this._databaseProvider.close();
  }

  addLanguage(lang: Language) {
    this._languages.push(lang);
  }

  setEventPublishProvider(eventPublishProvider: EventPublishProvider) {
    this._eventPublishProvider = eventPublishProvider;
  }

  filterSingle(rowIndex: number, tagIndex: number) {
    this._eventPublishProvider?.filterSinglePublish(rowIndex, tagIndex);
  }
  filterTags(rowIndex: number, tagIndex: number) {
    this._eventPublishProvider?.filterTagsPublish(rowIndex, tagIndex);
  }
}
