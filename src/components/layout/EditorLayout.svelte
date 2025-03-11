<script lang="ts">
  import { tableProvider } from '../../lib/states/table-provider.svelte';
  import CheckInput from '../core/CheckInput.svelte';
  import Pagination from '../core/Pagination.svelte';
  import SearchInput from '../core/SearchInput.svelte';
  import Selection from '../core/Selection.svelte';
  import Table from '../core/Table.svelte';
</script>

<div class="flex">
  <SearchInput searchedItems={tableProvider.filter} onSearch={(filter) => tableProvider.changeFilter(filter)} />
  <div class="flex">
    <Selection
      languages={tableProvider.languages}
      initValue={tableProvider.langIndex}
      onChange={(value: number) => tableProvider.changeLanguage(value)}
      class="ml-4" />

    <CheckInput
      class="ml-4 mt-2"
      label="Strict"
      checked={tableProvider.strictFilter}
      onClick={(value: boolean) => tableProvider.changeStrictFilter(value)} />

    <CheckInput
      class="ml-4 mt-2"
      label="Missing"
      checked={tableProvider.missingFilter}
      onClick={(value: boolean) => tableProvider.changeMissingFilter(value)} />

    <CheckInput
      class="ml-4 mt-2"
      label="Changes"
      checked={tableProvider.changedFilter}
      onClick={(value: boolean) => tableProvider.changeChangedFilter(value)} />
  </div>
</div>

<Table page={tableProvider.pagination} />

<Pagination
  onChangePage={(page) => {
    tableProvider.changePage(page);
  }}
  onNextPage={() => tableProvider.nextPage()}
  onPrevPage={() => tableProvider.prevPage()} />
