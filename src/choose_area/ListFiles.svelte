<script lang="ts">
  import { describe } from "../sketch/config";
  import { ClickableCard } from "../sketch/files";

  let files = loadFiles();

  // boundary => list of [filename, description]
  function loadFiles(): Map<string, [string, string][]> {
    let map = new Map();
    for (let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i)!;
      if (key.startsWith("npt_ss/") && !key.endsWith("/last-opened-file")) {
        try {
          let state = JSON.parse(window.localStorage.getItem(key) || "");
          let description = describe(state);

          let [_, boundary, filename] = key.split("/");

          if (!map.has(boundary)) {
            map.set(boundary, []);
          }
          map.get(boundary).push([filename, description]);
        } catch (_) {}
      }
    }

    for (let list of map.values()) {
      list.sort();
    }
    return map;
  }
</script>

<div style="columns: 2">
  {#each files as [boundary, list]}
    <div class="group">
      <h2>{boundary}</h2>
      {#each list as [filename, description]}
        <ClickableCard
          name={filename}
          on:click={() =>
            (window.location.href = `sketch.html?boundary=${boundary}&file=${filename}`)}
        >
          {description}
        </ClickableCard>
      {/each}
    </div>
  {/each}
</div>

<style>
  .group {
    border: 1px solid black;
    padding: 4px;
    margin-bottom: 8px;
    break-inside: avoid-column;
  }
</style>
