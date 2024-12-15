<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "./lib/components/Layout.svelte";
  import { vscodeEventPublisher } from "./lib/states/vscode-event-publish.svelte";
  import { vscodeEventListener } from "./lib/states/vscode-event-listener.svelte";

  onMount(() => {
    vscodeEventListener.listeningEvents();
    vscodeEventPublisher.sendOnloadEvent();
  });
</script>

<Layout />
