import type { IBasicFilterAndPaginationEvent } from "../models/events/publish/basic-filter-and-pagination.event";
import type { ILanguage } from "../models/language.interface";
import type { IPagination } from "../models/pagination.interface";
import { vscodeEventPublisher } from "./vscode-event-publish.svelte";

class TableProvider {
  pagination = $state.raw<IPagination | undefined>();
  filter = $state<string[]>([]);
  strictFilter = $state<boolean>(false);
  missingFilter = $state<boolean>(false);
  languages = $state.raw<ILanguage[]>([]);

  changeFilter(filter: string[]) {
    this.filter = filter;
    const data = {
      filter: [...filter],
      page: 1,
      size: this.pagination?.size ?? 10,
      strictFilter: this.strictFilter,
    };
    this.publishChangeTableEvent(data);
  }

  nextPage() {
    const data = {
      page: (this.pagination?.page ?? 0) + 1,
      size: this.pagination?.size ?? 10,
      filter: [...this.filter],
      strictFilter: this.strictFilter,
    };
    this.publishChangeTableEvent(data);
  }

  prevPage() {
    const data = {
      page: (this.pagination?.page ?? 0) - 1,
      size: this.pagination?.size ?? 10,
      filter: [...this.filter],
      strictFilter: this.strictFilter,
    };
    this.publishChangeTableEvent(data);
  }

  changePage(page: number) {
    const data = {
      page,
      size: this.pagination?.size ?? 10,
      filter: [...this.filter],
      strictFilter: this.strictFilter,
    };
    this.publishChangeTableEvent(data);
  }
  private publishChangeTableEvent(data: IBasicFilterAndPaginationEvent) {
    vscodeEventPublisher.sendChangePageEvent(data);
  }

  public changeLanguage(data: number) {
    vscodeEventPublisher.changeLanguage(data);
  }
  public changeStrictFilter(data: boolean) {
    this.strictFilter = data;
    vscodeEventPublisher.changeStrictFilter(data);
  }
  public changeMissingFilter(data: boolean) {
    this.missingFilter = data;
    vscodeEventPublisher.changeMissingFilter(data);
  }
  public deleteProperty(id: number) {
    let page = this.pagination?.page ?? 1;
    if (this.pagination?.data.length === 1 && this.pagination?.page > 1) {
      page = this.pagination?.page - 1;
    }
    vscodeEventPublisher.deleteProperty(id, page);
  }
}

export const tableProvider = new TableProvider();
