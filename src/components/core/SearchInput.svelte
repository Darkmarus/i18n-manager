<script lang="ts">
  import { fly } from 'svelte/transition';
  import { suggestionProvider } from '../../lib/states/suggestion-provider.svelte';
  import { Debounce } from '../../lib/utils/debounce';
  import LoadingIcon from '../icons/LoadingIcon.svelte';
  import SearchIcon from '../icons/SearchIcon.svelte';
  import Badge from './Badge.svelte';
  interface Props {
    searchedItems: string[];
    onSearch?: (items: string[]) => void;
  }

  let { onSearch, searchedItems = $bindable() }: Props = $props();

  let text = $state('');
  let isLoading = $state(false);
  let selectedIndex = $state(-1);

  const debounceSearchSuggestions = new Debounce(400);
  const debounceClear = new Debounce(250);

  const addSearchedItem = (value: string) => {
    if (!value) return;
    searchedItems.push(value);
    onSearch?.(searchedItems);
    text = '';
    debounceClear.call(clearSuggestions, true);
  };

  const removeSearchedItem = (index: number) => {
    searchedItems.splice(index, 1);
    onSearch?.(searchedItems);
  };

  const handleUpKey = () => {
    const size = suggestionProvider.data.length;
    if (size === 0) return;
    if (selectedIndex === 0 || selectedIndex === -1) {
      selectedIndex = size - 1;
    } else {
      selectedIndex -= 1;
    }
  };

  const handleDownKey = () => {
    const size = suggestionProvider.data.length;
    if (size === 0) return;
    if (!(size > selectedIndex + 1) || selectedIndex === -1) {
      selectedIndex = 0;
    } else {
      selectedIndex += 1;
    }
  };

  const clearSuggestions = () => {
    selectedIndex = -1;
    suggestionProvider.data = [];
  };

  const searchSuggestions = (text: string) => {
    suggestionProvider.change(text || '');
    isLoading = false;
  };

  const handleInputKeydown = (event: any) => {
    switch (event.key) {
      case 'Enter':
        if (selectedIndex !== -1) {
          addSearchedItem(suggestionProvider.data[selectedIndex]);
        } else {
          addSearchedItem(text);
        }
        break;
      case 'ArrowDown':
        handleDownKey();
        break;
      case 'ArrowUp':
        handleUpKey();
        break;
      case 'Escape':
        clearSuggestions();
        break;
      default:
        debounceSearchSuggestions.call(() => {
          isLoading = true;
          searchSuggestions(text);
        });
    }
  };
</script>

<div class="relative flex flex-auto mb-4">
  <div class="flex flex-auto rounded-md ring-1 relative py-2 pl-10">
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
        border-none
        placeholder-slate-400
        !outline-none"
      type="text"
      aria-label="Filter properties"
      placeholder="Filter properties..."
      bind:value={text}
      onkeydown={(event: any) => handleInputKeydown(event)}
      onblur={() => {
        console.log('clear on blur');
        debounceClear.call(clearSuggestions);
      }} />
  </div>

  <ul class="absolute w-full bg-white top-10 shadow" transition:fly={{ y: -10, duration: 150 }}>
    {#each suggestionProvider.data as item, index}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <li
        class="cursor-pointer w-full text-black hover:bg-blue-400 hover:text-white p-1 select-none"
        class:bg-blue-500={selectedIndex === index}
        class:text-white={selectedIndex === index}
        onclick={() => addSearchedItem(item)}
        tabindex={selectedIndex === index ? 0 : -1}>
        {item}
      </li>
    {/each}
  </ul>
</div>
