<script lang="ts">
  import { tableProvider } from "../../states/table-provider.svelte";
  import Pagination from "./components/Pagination.svelte";
  import SearchInput from "./components/SearchInput.svelte";
  import Table from "./components/Table.svelte";
</script>

<SearchInput onSearch={(filter) => tableProvider.filterTable(filter)} />

<Table page={tableProvider.data} />

<Pagination
  onChangePage={(page) => {
    tableProvider.changePage(page);
  }}
  onNextPage={() => tableProvider.nextPage()}
  onPrevPage={() => tableProvider.prevPage()}
/>
