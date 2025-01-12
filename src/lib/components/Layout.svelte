<script lang="ts">
  import type { Section } from "../models/section-type";
  import { tableProvider } from "../states/table-provider.svelte";
  import Switch from "./editor/components/Switch.svelte";
  import EditorLayout from "./editor/EditorLayout.svelte";
  import ChangesLogIcon from "./icons/ChangesLogIcon.svelte";
  import JsonEditIcon from "./icons/JsonEditIcon.svelte";
  import SettingsIcon from "./icons/SettingsIcon.svelte";

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
</script>

<div class="flex justify-between mx-4 mt-4">
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
  <Switch />
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
