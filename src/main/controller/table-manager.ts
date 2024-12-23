import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import type { IBasicFilterAndPaginationEvent } from "../model/events/listener/basic-filter-and-pagination.event";
import { EventListenerProvider } from "../provider/event-listener-provider";
import { EventPublishProvider } from "../provider/event-publish-provider";
import type { JsonManagerProvider } from "../provider/json-manager-provider";
import type { TableProvider } from "../provider/table-provider";
import { VscodeUtil } from "../util/vscode-util";

export class TableManager {
  private _panel?: vscode.WebviewPanel;
  private _eventListenerProvider?: EventListenerProvider;

  constructor(
    private readonly _context: vscode.ExtensionContext,
    private readonly _jsonManagerProvider: JsonManagerProvider,
    private readonly _tableProvider: TableProvider
  ) {}

  async init() {
    await this._tableProvider.init();
    const files = await this._jsonManagerProvider.loadFiles();

    if (files) {
      const promises: Promise<void>[] = [];
      files.forEach((f) => {
        const [lang, data] = f;
        this._tableProvider.addLanguage(lang);
        promises.push(
          this._tableProvider.savedDataInBatch(lang.filename, data)
        );
      });

      await Promise.all(promises);
    }
    await this.createdWebView();
  }

  private async createdWebView() {
    this._panel = vscode.window.createWebviewPanel(
      "i18n-manager-panel",
      "i18n Manager",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(this._context.extensionPath, "media")),
        ],
      }
    );
    this._eventListenerProvider = new EventListenerProvider(this, this._panel);
    this._eventListenerProvider.watchEvents();
    this._tableProvider.setEventPublishProvider(
      new EventPublishProvider(this._panel)
    );

    this._panel.webview.html = this.getTemplate();
    this._panel.onDidDispose(async () => {
      await this._tableProvider.closedDb();
    });
  }

  loadData() {
    this._tableProvider.loadedData();
  }

  filterAndPaginate({
    filter,
    page,
    size,
    modeOrderStrict,
  }: IBasicFilterAndPaginationEvent) {
    this._tableProvider.filterAndPaginate(filter, modeOrderStrict, page, size);
  }

  changeLanguage(lang: number) {
    this._tableProvider.changeLanguage(lang);
  }
  changeStrictFilterMode(data: boolean) {
    this._tableProvider.changeStrictFilterMode(data);
  }

  private getTemplate(): string {
    const template = this.resolverUri("index.html");

    const linksPath = [this.resolverUri("index.css")]
      .map((l) => `<link rel="stylesheet" crossorigin href="${l}">`)
      .join("\n");

    const linksScript = [this.resolverUri("index.js")]
      .map((l) => `<script type="module" crossorigin src="${l}"></script>`)
      .join("\n");

    return fs
      .readFileSync(template.fsPath)
      .toString()
      .replace("{{LINKS_CSS}}", linksPath)
      .replace("{{LINKS_SCRIPTS}}", linksScript);
  }

  private resolverUri(file: string): vscode.Uri {
    if (!this._panel) {
      throw new Error("Panel is not loaded.");
    }

    const uri = vscode.Uri.file(VscodeUtil.resolverUri(file).path);
    return this._panel.webview.asWebviewUri(uri);
  }
}
