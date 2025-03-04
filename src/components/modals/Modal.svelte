<script lang="ts">
  import { onMount } from 'svelte';
  import type { ItemModal } from '../../states/modal-provider.svelte';

  interface Props {
    context: ItemModal;
    onclose: () => void;
  }

  let { context = $bindable(), onclose }: Props = $props();

  onMount(() => {
    context.instance.showModal();
  });
</script>

<dialog bind:this={context.instance} onclose={() => onclose()}>
  <context.component {...context} />
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
