import * as vscode from "vscode";
import { CommandProvider } from "./main/provider/command-provider";
import { VscodeUtil } from "./main/util/vscode-util";

export function activate(context: vscode.ExtensionContext) {
  const commandProvider = new CommandProvider(context);
  VscodeUtil.loadContext(context);
  context.subscriptions.push(...commandProvider.register());
}

export function deactivate() {}
