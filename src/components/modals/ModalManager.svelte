<script lang="ts">
  import { modalProvider } from "../../lib/states/modal-provider.svelte";
  import Modal from "./Modal.svelte";
</script>

{#each modalProvider.modals as item}
  <Modal
    context={item}
    onclose={() => {
      modalProvider.remove(item);
    }}
  />
{/each}
