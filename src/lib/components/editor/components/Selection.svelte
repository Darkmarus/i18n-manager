<script lang="ts">
  const { class: className } = $props();
</script>

<div class="flex relative">
  <select
    class="w-full h-10 border border-slate-200 rounded-md px-3 py-2 appearance-none cursor-pointer {className}"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>
