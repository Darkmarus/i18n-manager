<script lang="ts">
  import type { Section } from '../../lib/models/section-type';
  import { modalProvider } from '../../lib/states/modal-provider.svelte';
  import { vscodeEventPublisher } from '../../lib/states/vscode-event-publish.svelte';
  import Button from '../core/Button.svelte';
  import JsonEditIcon from '../icons/JsonEditIcon.svelte';
  import SettingsIcon from '../icons/SettingsIcon.svelte';
  import MergePropertyModal from '../modals/template/MergePropertyModal.svelte';
  import EditorLayout from './EditorLayout.svelte';

  const sections = $state<Section[]>([
    {
      type: 'EDITOR',
      label: 'Editor',
      component: JsonEditIcon,
    },
    {
      type: 'SETTINGS',
      label: 'Settings',
      component: SettingsIcon,
    },
  ]);
  let sectionActive = $state(sections[0]);

  const setSectionActive = (item: Section) => {
    sectionActive = item;
  };

  const handleClickMerge = async () => {
    const [isConfirmed, data, langIndex] = await modalProvider.new<[boolean, any, number]>(MergePropertyModal, null);
    if (isConfirmed) {
      vscodeEventPublisher.sendMargeProperties(data, langIndex);
    }
  };
</script>

<div class="flex mx-4 mt-4">
  <nav class="flex gap-6" aria-label="Tabs">
    {#each sections as item}
      <button
        onclick={() => setSectionActive(item)}
        class="
          inline-flex
          shrink-0
          items-center
          gap-2
          border-b-2
          px-4
          pb-2
          font-medium
          hover:border-blue-500
          hover:text-blue-500
          cursor-pointer
          select-none
          {item.type === sectionActive.type ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent'}">
        <item.component />
        {item.label}
      </button>
    {/each}
  </nav>
</div>
{#if sectionActive.type === 'EDITOR'}
  <div class="absolute right-9 top-4">
    <Button onclick={handleClickMerge}>Add Properties</Button>
  </div>
{/if}

{#if sectionActive.type === 'EDITOR'}
  <div class="container-main">
    <EditorLayout />
  </div>
{:else if sectionActive.type === 'SETTINGS'}
  <div class="container-main">
    <div>settings</div>
  </div>
{:else}
  <div class="container-main">
    <div>Not implemented</div>
  </div>
{/if}

<style>
  .container-main {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0px;
    padding: 0 2rem;
    top: 4.5rem;
  }
</style>
