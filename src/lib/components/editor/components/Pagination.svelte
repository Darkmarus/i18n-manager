<script lang="ts">
  import { tableProvider } from "../../../states/table-provider.svelte";
  import Button from "../../buttons/Button.svelte";

  interface Props {
    onChangePage: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
  }

  let { onChangePage, onNextPage, onPrevPage }: Props = $props();

  const pages = $derived.by(() => {
    const pages: any[] = [];
    if (tableProvider.pagination === undefined) {
      return pages;
    }

    const currentPage = tableProvider.pagination.page;
    const totalPages = tableProvider.pagination.totalPages;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  });
</script>

<div class="flex items-center justify-center">
  <div class="flex space-x-1">
    <Button
      disabled={tableProvider?.pagination?.page === 1}
      onclick={onPrevPage}>Prev</Button
    >

    <div class="flex justify-center min-w-96">
      {#each pages as p}
        <Button
          active={p === tableProvider?.pagination?.page}
          disabled={p === "..."}
          onclick={() => onChangePage(p)}>{p}</Button
        >
      {/each}
    </div>

    <Button
      disabled={tableProvider?.pagination?.page ===
        tableProvider?.pagination?.totalPages}
      onclick={onNextPage}>Next</Button
    >
  </div>
</div>
