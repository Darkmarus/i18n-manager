import { EventsProvider } from "@main/provider/events-provider";
import type { JsonManagerProvider } from "@main/provider/json-manager-provider";
import { VscodeUtil } from "@main/util/vscode-util";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class TableManager {
  private _panel?: vscode.WebviewPanel;
  private _eventsProvider?: EventsProvider;

  constructor(
    private readonly _context: vscode.ExtensionContext,
    private readonly _jsonManagerProvider: JsonManagerProvider
  ) {}

  async init() {
    await this.createdWebView();
  }

  private async createdWebView() {
    await this._jsonManagerProvider.init();

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
    this._eventsProvider = new EventsProvider(this, this._panel);
    this._eventsProvider.watchEvents();

    this._panel.webview.html = this.getTemplate();
  }

  loadData() {
    this._eventsProvider?.refreshDataPublish(
      this._jsonManagerProvider.filterAndPaginate("")
    );
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
