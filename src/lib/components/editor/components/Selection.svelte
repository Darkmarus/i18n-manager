<script lang="ts">
  import type { ILanguage } from "../../../models/language.interface";

  interface Props {
    languages: ILanguage[];
    class?: string;
    change: (value: number) => void;
  }
  const { languages, class: className, change } = $props();

  let selected = $state(0);
</script>

<div class="flex relative">
  <select
    class="w-full h-10 border border-slate-200 rounded-md px-3 py-2 appearance-none cursor-pointer {className}"
    bind:value={selected}
    onchange={(event: any) => change && change(event.target.value)}
  >
    {#each languages as lang}
      <option value={lang.id}>{lang.filename}</option>
    {/each}
  </select>
</div>
