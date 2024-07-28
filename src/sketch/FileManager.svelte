<script lang="ts">
  import { SecondaryButton } from "govuk-svelte";
  import { Modal } from "scheme-sketcher-lib/common";
  import type { Writable } from "svelte/store";
  import type { State } from "./types";
  import folderUrl from "./files/assets/folder.svg?url";
  import { FileManager, LocalStorageFiles } from "./files";

  export let files: LocalStorageFiles<State>;
  export let currentFile: Writable<string>;
  export let gjSchemes: Writable<State>;

  let open = false;
</script>

<Modal title="Files" bind:open>
  <FileManager
    {files}
    {currentFile}
    state={gjSchemes}
    fileSuffix="geojson"
    onStart={() => (open = false)}
  />
</Modal>

<div>
  <SecondaryButton on:click={() => (open = true)}>
    <img src={folderUrl} alt="Manage files" style="vertical-align: middle;" />
    Manage files
  </SecondaryButton>
  <span class="govuk-body">
    Editing file <u>{$currentFile}</u>
  </span>
</div>
