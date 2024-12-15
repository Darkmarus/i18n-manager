import type { IBasicFilterAndPaginationEvent } from "../models/events/publish/basic-filter-and-pagination.event";
import type { IPagination } from "../models/pagination.interface";
import { vscodeEventPublisher } from "./vscode-event-publish.svelte";

class TableProvider {
  data = $state.raw<IPagination | undefined>();
  filter = $state.raw<string | undefined>();

  filterTable(filter: string) {
    this.filter = filter;
    const data = { filter, page: 1, size: this.data?.size || 10 };
    this.publishChangeTableEvent(data);
  }

  nextPage() {
    const data = {
      page: (this.data?.page || 0) + 1,
      size: this.data?.size || 10,
      filter: this.filter || "",
    };
    this.publishChangeTableEvent(data);
  }

  prevPage() {
    const data = {
      page: (this.data?.page || 0) - 1,
      size: this.data?.size || 10,
      filter: this.filter || "",
    };
    this.publishChangeTableEvent(data);
  }

  changePage(page: number) {
    const data = {
      page,
      size: this.data?.size || 10,
      filter: this.filter || "",
    };
    this.publishChangeTableEvent(data);
  }
  private publishChangeTableEvent(data: IBasicFilterAndPaginationEvent) {
    vscodeEventPublisher.sendChangePageEvent(data);
  }
}

export const tableProvider = new TableProvider();
