<script lang="ts">
  import type { ItemModal } from "../../../states/modal-provider.svelte";

  const { instance, resolve, data }: ItemModal = $props();

  const handleAccept = () => {
    resolve?.(true);
    instance.close();
  };

  const handleCancel = () => {
    resolve?.(false);
    instance.close();
  };
</script>

<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
  <div
    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
  >
    <div
      class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-base font-semibold text-gray-900" id="modal-title">
              Edit Property
            </h3>
            <div class="mt-2"></div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 sm:ml-3 sm:w-auto cursor-pointer select-none"
          onclick={() => handleAccept()}>Edit</button
        >
        <button
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer select-none"
          onclick={() => handleCancel()}>Cancel</button
        >
      </div>
    </div>
  </div>
</div>
