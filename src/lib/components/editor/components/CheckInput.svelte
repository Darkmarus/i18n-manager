<script lang="ts">
  interface Props {
    label: string;
    class?: string;
    onChange?: (value: boolean) => void;
  }
  let { label, class: className, onChange } = $props();
  let checked = $state(false);
  const id = newUUID();
  function newUUID(): string {
    let Id = "",
      IdPart;
    IdPart = Math.round(Math.random() * 0xffffffff).toString(16);
    Id += IdPart + "00000000".slice(IdPart.length) + "-";
    IdPart = Math.round(Math.random() * 0xffff).toString(16);
    Id += IdPart + "0000".slice(IdPart.length) + "-4";
    IdPart = Math.round(Math.random() * 0xfff).toString(16);
    Id += IdPart + "000".slice(IdPart.length) + "-";
    IdPart = Math.round(Math.random() * 0x3fff + 0x8000).toString(16);
    Id += IdPart + "-";
    IdPart = Math.round(Math.random() * 0xffffffffffff).toString(16);
    Id += IdPart + "000000000000".slice(IdPart.length);
    return Id.toLowerCase();
  }
</script>

<div class="flex items-center mb-4 relative {className}">
  <input
    id="checkbox-{id}"
    type="checkbox"
    bind:checked
    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
    onchange={(event: any) => onChange && onChange(event.target.checked)}
  />
  <label for="checkbox-{id}" class="ml-1 font-norma cursor-pointer select-none"
    >{label}</label
  >
  <button
    aria-label="Checkbox"
    class="absolute text-white opacity-0 peer-checked:opacity-100 top-5 left-2.5 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
    onclick={() => {
      checked = !checked;
      onChange && onChange(checked);
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5"
      viewBox="0 0 20 20"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
</div>
