<script lang="ts">
  import LoadingIcon from "../../icons/LoadingIcon.svelte";
  import SearchIcon from "../../icons/SearchIcon.svelte";
  import Badge from "./Badge.svelte";
  interface Props {
    onSearch?: (items: string[]) => void;
  }

  let { onSearch }: Props = $props();

  let timer: any;
  let text = $state("");
  let isLoading = $state(false);
  let searchedItems = $state<string[]>([]);

  const addSearchedItem = () => {
    if (!text) return;

    searchedItems.push(text);
    text = "";
    onSearch?.(searchedItems);
  };

  const removeSearchedItem = (index: number) => {
    searchedItems.splice(index, 1);
    onSearch?.(searchedItems);
  };

  const debounce = (v?: string, immediate: boolean = false) => {
    isLoading = true;
    clearTimeout(timer);
    if (immediate) {
      addSearchedItem();
      isLoading = false;
    } else {
      timer = setTimeout(() => {
        addSearchedItem();
        isLoading = false;
      }, 1000);
    }
  };
</script>

<div class="flex rounded-md ring-1 relative mb-4 py-2 pl-10">
  {#if isLoading}
    <LoadingIcon />
  {:else}
    <SearchIcon />
  {/if}

  <div class="flex">
    {#each searchedItems as sItems, index}
      <Badge {index} text={sItems} onRemove={removeSearchedItem} />
    {/each}
  </div>

  <!-- oninput={(event: any) => debounce(event?.target?.value)} -->
  <input
    class="
      flex-auto
      leading-6
      placeholder-slate-400
      !outline-none
      shadow-sm"
    type="text"
    aria-label="Filter properties"
    placeholder="Filter properties..."
    bind:value={text}
    onkeydown={(event: any) =>
      event.key === "Enter" && debounce(event?.target?.value, true)}
  />
</div>
