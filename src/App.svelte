<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './components/layout/Layout.svelte';
  import ModalManager from './components/modals/ModalManager.svelte';
  import { vscodeEventListener } from './lib/states/vscode-event-listener.svelte';
  import { vscodeEventPublisher } from './lib/states/vscode-event-publish.svelte';

  onMount(() => {
    vscodeEventListener.listeningEvents();
    vscodeEventPublisher.sendOnloadEvent();
  });
</script>

<Layout />
<ModalManager />
