<script lang="ts">
  import type { ILanguage } from "../../../models/language.interface";

  interface Props {
    languages: ILanguage[];
    class?: string;
    onChange?: (value: number) => void;
  }
  const { languages, class: className, onChange } = $props();

  let selected = $state(0);
</script>

<div class="flex relative">
  <select
    class="w-full h-10 border border-slate-200 rounded-md px-3 py-2 cursor-pointer {className}"
    bind:value={selected}
    onchange={(event: any) => onChange && onChange(event.target.value)}
  >
    {#each languages as lang}
      <option class="cursor-pointer text-black" value={lang.id}>{lang.filename}</option>
    {/each}
  </select>
</div>
