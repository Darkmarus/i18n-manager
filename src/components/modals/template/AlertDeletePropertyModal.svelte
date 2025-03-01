<script lang="ts">
  import { onMount } from "svelte";
  import type { ItemModal } from "../../../lib/states/modal-provider.svelte";
  import { tableProvider } from "../../../lib/states/table-provider.svelte";
  import CheckInput from "../../core/CheckInput.svelte";

  const { instance, resolve, data }: ItemModal = $props();

  let languages: { id: number; name: string; checked: boolean }[] = $state([]);

  const handleAccept = () => {
    resolve?.([true, languages.filter((x) => x.checked).map((x) => x.name)]);
    instance.close();
  };

  const handleCancel = () => {
    resolve?.([false, null]);
    instance.close();
  };

  onMount(() => {
    const langIndex = +tableProvider.langIndex;
    languages = tableProvider.languages.map((lang) => ({
      id: lang.id,
      name: lang.filename,
      checked: lang.id === langIndex,
    }));
  });
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
          <div
            class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
          >
            <svg
              class="size-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-base font-semibold text-gray-900" id="modal-title">
              Delete Property
            </h3>
            <div class="mt-2 text-sm text-gray-700">
              <p>
                Remove Property <span class="font-bold"
                  >{"[" + data?.path?.join("].[") + "]"}</span
                >?
              </p>
              <p>in the files</p>
            </div>
            <div class="mt-2 flex flex-col text-sm text-gray-700">
              {#each languages as lang}
                <CheckInput
                  class="mb-2"
                  label={lang.name}
                  checked={lang.checked}
                  onClick={(value: boolean) => {
                    lang.checked = value;
                  }}
                />
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={!languages.some((lang) => lang.checked == true)}
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer select-none disabled:bg-gray-500"
          onclick={() => handleAccept()}>Delete</button
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
