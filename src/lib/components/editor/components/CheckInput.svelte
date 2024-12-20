<script lang="ts">
  const { label, class: className } = $props();
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

<div class="flex items-center mb-4 {className}">
  <input
    id="checkbox-{id}"
    type="checkbox"
    value=""
    class="w-5 h-5 appearance-none border cursor-pointer"
  />
  <label for="checkbox-{id}" class="ml-1 font-norma cursor-pointer no-select"
    >{label}</label
  >
</div>
