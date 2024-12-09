<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "./lib/components/Layout.svelte";
  import { vscodeEvents } from "./lib/states/vscode-events.svelte";

  onMount(() => vscodeEvents.sendOnloadEvent());
</script>

<Layout />
