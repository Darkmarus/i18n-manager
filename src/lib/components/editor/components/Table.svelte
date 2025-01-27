<script lang="ts">
  import type {
    IPagination,
    IProperty,
  } from "../../../models/pagination.interface";
  import { modalProvider } from "../../../states/modal-provider.svelte";
  import { tableProvider } from "../../../states/table-provider.svelte";
  import JsonEditIcon from "../../icons/JsonEditIcon.svelte";
  import TrashIcon from "../../icons/TrashIcon.svelte";
  import AlertDeletePropertyModal from "../../modals/template/AlertDeletePropertyModal.svelte";
  import EditPropertyModal from "../../modals/template/EditPropertyModal.svelte";
  import Badge from "./Badge.svelte";

  interface Props {
    page?: IPagination;
  }

  let { page }: Props = $props();
  let tableElement: any;
  let indexSelected = $state(-1);

  const handleUpKey = () => {
    if (indexSelected === 0 || indexSelected === -1) {
      indexSelected = (page?.data?.length || 0) - 1;
    } else {
      indexSelected -= 1;
    }
  };

  const handleDownKey = () => {
    const length = page?.data?.length || 0;
    if (!(length > indexSelected + 1) || indexSelected === -1) {
      indexSelected = 0;
    } else {
      indexSelected += 1;
    }
  };

  const keyEvent: any = {
    ArrowDown: handleDownKey,
    ArrowUp: handleUpKey,
  };

  const handleKeyNavigation = (event: KeyboardEvent) => {
    const func = keyEvent[event.key];
    func && func();
  };

  const handleClickOutTable = (event: any) => {
    if (!tableElement.contains(event.target)) {
      indexSelected = -1;
    }
  };

  const handleDeleteItem = async (item: IProperty) => {
    const [isConfirmed, langs] = await modalProvider.new(
      AlertDeletePropertyModal,
      item
    );
    if (isConfirmed) {
      tableProvider.deleteProperty(item.id, langs);
    }
  };

  const handleEditItem = async (item: IProperty) => {
    const data = await modalProvider.new(EditPropertyModal, item);
  };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<table
  class="text-left w-full border-1 border-gray-400 order-slate-500 focus:border-slate-100 mb-5 rounded !outline-none"
  bind:this={tableElement}
  tabindex="0"
  onkeydown={handleKeyNavigation}
  onclick={handleClickOutTable}
>
  <thead class="bg-blue-500 flex text-white w-full">
    <tr class="flex w-full">
      <th class="p-4 w-6/12 text-center uppercase">properties</th>
      <th class="p-4 w-1/12 text-center uppercase">type</th>
      <th class="p-4 w-3/12 text-center uppercase">value</th>
      <th class="p-4 w-2/12 text-center uppercase">actions</th>
    </tr>
  </thead>
  <tbody
    class="flex flex-col bg-grey-light overflow-y-auto w-full"
    style="height: calc( 100vh - 250px );"
  >
    {#if page}
      {#each page.data as item, rowIndex}
        <tr
          class="flex w-full py-2 hover:bg-white/10"
          class:row-selected={indexSelected === rowIndex}
          onclick={() => (indexSelected = rowIndex)}
        >
          <td class="w-6/12 pl-2">
            {#each item.path as p, tagIndex}
              <Badge
                index={tagIndex}
                text={p}
                dataAttribute={JSON.stringify({
                  webviewSection: "filter-tag",
                  preventDefaultContextMenuItems: true,
                  rowIndex,
                  tagIndex,
                })}
              />
            {/each}
          </td>
          <td class="w-1/12 flex justify-center">
            <span
              >{Array.isArray(item.value) ? "array" : typeof item.value}</span
            >
          </td>
          <td class="w-3/12 flex">
            <div class="truncate max-w-72">
              <span>{item.value}</span>
            </div>
          </td>
          <td class="w-2/12 flex justify-center">
            <button
              type="button"
              class="cursor-pointer"
              onclick={() => handleEditItem(item)}
              aria-label="Edit"
            >
              <JsonEditIcon />
            </button>

            <button
              type="button"
              class="cursor-pointer ml-2"
              onclick={() => handleDeleteItem(item)}
              aria-label="Delete"
            >
              <TrashIcon />
            </button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<style>
  .row-selected {
    background-color: #435dab;
  }
</style>
