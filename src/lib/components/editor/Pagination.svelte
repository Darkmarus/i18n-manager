<script lang="ts">
  import Button from "../buttons/Button.svelte";
  import { vscodeEvents } from "../../states/vscode-events.svelte";

  const pages = $derived.by(() => {
    const pages: any[] = [];
    if (vscodeEvents.page === undefined) {
      return pages;
    }

    const currentPage = vscodeEvents.page.page;
    const totalPages = vscodeEvents.page.totalPages;

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
    <Button>Prev</Button>

    {#each pages as p}
      <Button active={p === vscodeEvents?.page?.page} disabled={p === "..."}
        >{p}</Button
      >
    {/each}

    <Button>Next</Button>
  </div>
</div>
