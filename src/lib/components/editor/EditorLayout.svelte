<script lang="ts">
  import { tableProvider } from "../../states/table-provider.svelte";
  import CheckInput from "./components/CheckInput.svelte";
  import Pagination from "./components/Pagination.svelte";
  import SearchInput from "./components/SearchInput.svelte";
  import Selection from "./components/Selection.svelte";
  import Table from "./components/Table.svelte";
</script>

<div class="flex">
  <SearchInput onSearch={(filter) => tableProvider.filterTable(filter)} />
  <div class="flex">
    <Selection languages={tableProvider.languages} class="ml-4" />
    <CheckInput class="ml-4" label="Strict" />
    <CheckInput class="ml-4" label="Not Implemented" />
  </div>
</div>

<Table page={tableProvider.data} />

<Pagination
  onChangePage={(page) => {
    tableProvider.changePage(page);
  }}
  onNextPage={() => tableProvider.nextPage()}
  onPrevPage={() => tableProvider.prevPage()}
/>
