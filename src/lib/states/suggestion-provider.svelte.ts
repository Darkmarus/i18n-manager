import { vscodeEventPublisher } from './vscode-event-publish.svelte';

export class SuggestionProvider {
  private _data = $state<string[]>([]);

  public change(text: string) {
    vscodeEventPublisher.changeSuggestion(text);
  }

  public reset() {
    this._data = [];
  }

  public get data() {
    return this._data;
  }

  public set data(data: string[]) {
    this._data = data;
  }
}

export const suggestionProvider = new SuggestionProvider();
