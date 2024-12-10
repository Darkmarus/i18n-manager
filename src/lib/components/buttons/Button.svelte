<script lang="ts">
  interface Props {
    active?: boolean;
    disabled?: boolean;
    children?: any;
  }
  let { children, active = false, disabled=false }: Props = $props();
</script>

<button
  class="min-w-9
      rounded-md
      border
      border-slate-300
      py-2
      px-3
      text-center
      text-sm
      transition-all
      shadow-sm
      hover:shadow-lg
      cursor-pointer
      hover:bg-blue-500
      hover:border-slate-800
      active:border-slate-800
      active:text-white
      active:bg-blue-500
      disabled:pointer-events-none
      disabled:opacity-50
      disabled:shadow-none
      disabled:cursor-not-allowed
      select-none
      ml-2"
  class:bg-blue-500={active}
  disabled={disabled}
>
  {@render children()}
</button>
