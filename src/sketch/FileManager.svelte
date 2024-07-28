<script lang="ts">
  import { SecondaryButton } from "govuk-svelte";
  import { Modal } from "scheme-sketcher-lib/common";
  import type { Writable } from "svelte/store";
  import type { NptFeature, NptScheme } from "./types";
  import type { Schemes } from "scheme-sketcher-lib/draw/types";
  import folderUrl from "./files/assets/folder.svg?url";
  import { FileManager, LocalStorageFiles } from "./files";

  export let boundaryName: string;
  export let files: LocalStorageFiles<Schemes<NptFeature, NptScheme>>;
  export let currentFile: Writable<string>;
  export let gjSchemes: Writable<Schemes<NptFeature, NptScheme>>;

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
