<script lang="ts">
  interface Props {
    index: number;
    text: string;
    onRemove?: (index: number) => void;
  }
  let { index, text, onRemove }: Props = $props();
</script>

<span
  class="mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 select-none"
  class:cursor-pointer={!onRemove}
>
  {text}

  {#if onRemove}
    <button
      type="button"
      class="shrink-0 size-4 inline-flex items-center justify-center rounded-full focus:outline-none focus:text-blue-500 hover:bg-white hover:text-slate-500 cursor-pointer"
      aria-label="Close"
      onclick={() => onRemove?.(index)}
    >
      <svg
        class="shrink-0 size-3"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  {/if}
</span>
