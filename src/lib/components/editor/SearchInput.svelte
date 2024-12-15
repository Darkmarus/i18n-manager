<script lang="ts">
  import LoadingIcon from "../icons/LoadingIcon.svelte";
  import SearchIcon from "../icons/SearchIcon.svelte";
  interface Props {
    onSearch?: (value: string) => void;
  }

  let { onSearch }: Props = $props();

  let timer: any;
  let isLoading = $state(false);

  const debounce = (v?: string, immediate: boolean = false) => {
    isLoading = true;
    clearTimeout(timer);
    if (immediate) {
      onSearch && onSearch(v || "");
      isLoading = false;
    } else {
      timer = setTimeout(() => {
        onSearch && onSearch(v || "");
        isLoading = false;
      }, 1000);
    }
  };
</script>

<div class="group relative mb-4">
  {#if isLoading}
    <LoadingIcon />
  {:else}
    <SearchIcon />
  {/if}

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
    oninput={(event: any) => debounce(event?.target?.value)}
    onkeydown={(event: any) =>
      event.key === "Enter" && debounce(event?.target?.value, true)}
  />
</div>
