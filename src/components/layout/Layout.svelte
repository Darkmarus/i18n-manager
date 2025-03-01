<script lang="ts">
  import type { Section } from "../../lib/models/section-type";
  import { modalProvider } from "../../lib/states/modal-provider.svelte";
  import { vscodeEventPublisher } from "../../lib/states/vscode-event-publish.svelte";
  import Button from "../core/Button.svelte";
  import ChangesLogIcon from "../icons/ChangesLogIcon.svelte";
  import JsonEditIcon from "../icons/JsonEditIcon.svelte";
  import SettingsIcon from "../icons/SettingsIcon.svelte";
  import MergePropertyModal from "../modals/template/MergePropertyModal.svelte";
  import EditorLayout from "./EditorLayout.svelte";

  const sections = $state<Section[]>([
    {
      type: "EDITOR",
      label: "Editor",
      component: JsonEditIcon,
    },
    {
      type: "CHANGES",
      label: "Changes",
      component: ChangesLogIcon,
    },
    {
      type: "SETTINGS",
      label: "Settings",
      component: SettingsIcon,
    },
  ]);
  let sectionActive = $state(sections[0]);

  const setSectionActive = (item: Section) => {
    sectionActive = item;
  };

  const handleClickMerge = async () => {
    const [isConfirmed, data, langIndex] = await modalProvider.new<
      [boolean, any, number]
    >(MergePropertyModal, null);
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
          {item.type === sectionActive.type
          ? 'text-blue-500 border-blue-500'
          : 'text-gray-500 border-transparent'}"
      >
        <item.component />
        {item.label}
      </button>
    {/each}
  </nav>
  {#if sectionActive.type === "EDITOR"}
    <div class="absolute right-9">
      <Button onclick={handleClickMerge}>Merge</Button>
    </div>
  {/if}
</div>

<div class="m-4">
  {#if sectionActive.type === "CHANGES"}
    <div>changes</div>
  {/if}

  {#if sectionActive.type === "EDITOR"}
    <EditorLayout />
  {/if}

  {#if sectionActive.type === "SETTINGS"}
    <div>settings</div>
  {/if}
</div>
