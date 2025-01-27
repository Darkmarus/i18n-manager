<script lang="ts">
  import * as ace from "ace-builds";
  import "ace-builds/src-noconflict/mode-json";
  import "ace-builds/src-noconflict/theme-cloud_editor_dark";
  import { onMount } from "svelte";
  import type { ItemModal } from "../../../states/modal-provider.svelte";

  const { instance, resolve, data }: ItemModal = $props();

  let editorElement = $state<HTMLElement>();
  let editorInstance = $state<any>();

  const handleAccept = () => {
    resolve?.(true);
    instance.close();
  };

  const handleCancel = () => {
    resolve?.(false);
    instance.close();
  };

  const handleClickFormat = () => {
    editorInstance.setValue(
      JSON.stringify(JSON.parse(editorInstance.getValue()), null, 2)
    );
    editorInstance.clearSelection();
  };

  onMount(() => {
    const editor = ace.edit(editorElement, {
      mode: "ace/mode/json",
    });
    editor.setTheme("ace/theme/cloud_editor_dark");
    editor.setOption("showPrintMargin", false);
    editor.setFontSize(16);
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(false);
    editor.renderer.setHighlightGutterLine(false);
    editor.setValue(
      JSON.stringify(JSON.parse('{"nombre": "Juan","edad": 30}'), null, 2)
    );
    editor.clearSelection();

    editorInstance = editor;
  });
</script>

<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
  <div class="flex min-h-full justify-center items-center p-4 text-center">
    <div
      class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg"
    >
      <div class="bg-white mx-6">
        <div class="flex">
          <div class="mt-3 text-left">
            <h3 class="text-base font-semibold text-gray-900 py-4">
              Merge properties
            </h3>
          </div>
        </div>
      </div>
      <div class="flex mx-6 mb-2">
        <button
          type="button"
          class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 w-auto cursor-pointer select-none"
          onclick={handleClickFormat}>Format</button
        >
      </div>
      <div class="mx-6 border-solid border-1 border-stone-500">
        <pre class="h-96 editor-code-container" bind:this={editorElement}></pre>
      </div>
      <div class="bg-gray-50 px-6 py-3 flex justify-end">
        <button
          type="button"
          class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 w-auto cursor-pointer select-none"
          onclick={() => handleCancel()}>Cancel</button
        >
        <button
          type="button"
          class="inline-flex justify-center rounded-md bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 ml-3 w-auto cursor-pointer select-none"
          onclick={() => handleAccept()}>Edit</button
        >
      </div>
    </div>
  </div>
</div>
