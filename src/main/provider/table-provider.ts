import type { Language } from "../model/language.interface";
import type { IPagination, IProperty } from "../model/pagination.interface";
import type { LanguageEntityManager } from "../persistence/language-entity-manager";
import type { DatabaseProvider } from "./database-provider";
import type { EventPublishProvider } from "./event-publish-provider";

export class TableProvider {
  private readonly _languages: Language[] = [];
  private _languageDefault = 0;
  private _modeOrderStrict: boolean = false;
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
          lang      TEXT    NOT NULL);`);
    await this._databaseProvider.exec(`DELETE FROM language;`);
  }

  async loadedData() {
    this._eventPublishProvider?.languagesPublish(this.languages);
    this._eventPublishProvider?.refreshDataPublish(
      await this.filterAndPaginate(
        this._filter,
        this._modeOrderStrict,
        this._page,
        this._size
      )
    );
  }
  async changeLanguage(lang: number) {
    this._languageDefault = lang;
    this._eventPublishProvider?.refreshDataPublish(
      await this.filterAndPaginate(
        this._filter,
        this._modeOrderStrict,
        this._page,
        this._size
      )
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
    modeOrderStrict: boolean,
    page: number,
    size: number
  ): Promise<IPagination> {
    if (size <= 0 || page <= 0) {
      throw new Error("Los parámetros `size` y `page` deben ser mayores a 0.");
    }
    this._filter = filter;
    this._modeOrderStrict = modeOrderStrict;
    this._size = size;
    this._page = page;

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
}
