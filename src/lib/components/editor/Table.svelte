<script lang="ts">
  import SearchIcon from "../icons/SearchIcon.svelte";
  import Pagination from "./Pagination.svelte";
  import { vscodeEvents } from "../../states/vscode-events.svelte";
</script>

<form class="group relative mb-4">
  <SearchIcon />
  <input
    class="
    leading-6
    placeholder-slate-400
    rounded-md
    py-2
    pl-10
    ring-1
    shadow-sm"
    type="text"
    aria-label="Filter properties"
    placeholder="Filter properties..."
  />
</form>

<table class="text-left w-full">
  <thead class="bg-blue-500 flex text-white w-full">
    <tr class="flex w-full">
      <th class="p-4 w-8/12 text-center uppercase">properties</th>
      <th class="p-4 w-4/12 text-center uppercase">actions</th>
    </tr>
  </thead>
  <tbody class="bg-grey-light overflow-y-auto w-full" style="height: 70vh;">
    {#if vscodeEvents.page}
      {#each vscodeEvents.page.data as item}
        <tr class="flex w-full border-b-2 border-blue-500 py-5">
          <td class="w-8/12">
            {#each item.path as p}
              <span
                class="bg-gray-100 text-gray-800 me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer select-none"
                >{p}</span
              >
            {/each}
          </td>
          <td class="w-4/12 text-center">Cats</td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<Pagination />
