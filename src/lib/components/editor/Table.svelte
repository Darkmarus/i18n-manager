<script lang="ts">
  import SearchIcon from "../icons/SearchIcon.svelte";
  import Pagination from "./Pagination.svelte";
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
  <tbody
    class="bg-grey-light flex flex-col items-center justify-between overflow-y-auto w-full"
    style="height: 70vh;"
  >
    <tr class="flex w-full mb-4 border-b-2 border-b-blue-300">
      <td class="p-4 w-8/12">Dogs</td>
      <td class="p-4 w-4/12 text-center">Cats</td>
    </tr>
  </tbody>
</table>

<Pagination />
