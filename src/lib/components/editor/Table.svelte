<script lang="ts">
  import type { IPagination } from "../../models/pagination.interface";
  import { tableProvider } from "../../states/table-provider.svelte";
  import JsonEditIcon from "../icons/JsonEditIcon.svelte";
  import TrashIcon from "../icons/TrashIcon.svelte";
  import Pagination from "./Pagination.svelte";
  import SearchInput from "./SearchInput.svelte";

  interface Props {
    page?: IPagination;
  }

  let { page }: Props = $props();
</script>

<SearchInput onSearch={(filter) => tableProvider.filterTable(filter)} />

<table class="text-left w-full">
  <thead class="bg-blue-500 flex text-white w-full">
    <tr class="flex w-full">
      <th class="p-4 w-8/12 text-center uppercase">properties</th>
      <th class="p-4 w-4/12 text-center uppercase">actions</th>
    </tr>
  </thead>
  <tbody
    class="flex flex-col bg-grey-light overflow-y-auto w-full mb-5"
    style="height: calc( 100vh - 250px );"
  >
    {#if page}
      {#each page.data as item}
        <tr class="flex w-full border-b-2 border-blue-500 py-5">
          <td class="w-8/12">
            {#each item.path as p}
              <span
                class="bg-gray-100 text-gray-800 me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer select-none"
                >{p}</span
              >
            {/each}
          </td>
          <td class="w-4/12 flex justify-center">
            <div class="cursor-pointer">
              <JsonEditIcon />
            </div>

            <div class="cursor-pointer ml-2">
              <TrashIcon />
            </div>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<Pagination
  onChangePage={(page) => {
    tableProvider.changePage(page);
  }}
  onNextPage={() => tableProvider.nextPage()}
  onPrevPage={() => tableProvider.prevPage()}
/>
