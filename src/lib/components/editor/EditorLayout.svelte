<script lang="ts">
  import { tableProvider } from "../../states/table-provider.svelte";
  import CheckInput from "./components/CheckInput.svelte";
  import Pagination from "./components/Pagination.svelte";
  import SearchInput from "./components/SearchInput.svelte";
  import Selection from "./components/Selection.svelte";
  import Table from "./components/Table.svelte";
</script>

<div class="flex">
  <SearchInput
    searchedItems={tableProvider.filter}
    onSearch={(filter) => tableProvider.changeFilter(filter)}
  />
  <div class="flex">
    <Selection
      languages={tableProvider.languages}
      onChange={(value: number) => tableProvider.changeLanguage(value)}
      class="ml-4"
    />
    <CheckInput
      class="ml-4"
      label="Strict"
      checked={tableProvider.strictFilter}
      onClick={(value: boolean) => tableProvider.changeStrictFilter(value)}
    />
    <CheckInput
      class="ml-4"
      label="Missing"
      checked={tableProvider.missingFilter}
      onClick={(value: boolean) => tableProvider.changeMissingFilter(value)}
    />
  </div>
</div>

<Table page={tableProvider.pagination} />

<Pagination
  onChangePage={(page) => {
    tableProvider.changePage(page);
  }}
  onNextPage={() => tableProvider.nextPage()}
  onPrevPage={() => tableProvider.prevPage()}
/>
