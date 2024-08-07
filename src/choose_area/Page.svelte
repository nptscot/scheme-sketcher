<script lang="ts">
  import "../style/main.css";
  // @ts-expect-error no declarations
  import { initAll } from "govuk-frontend";
  import { onMount } from "svelte";
  import { ErrorMessage, Radio } from "govuk-svelte";
  import {
    MapLibre,
    FillLayer,
    GeoJSON,
    hoverStateFilter,
    LineLayer,
    Popup,
    type LayerClickInfo,
  } from "svelte-maplibre";
  import boundariesUrl from "../../assets/boundaries.geojson?url";
  import type { LngLatBoundsLike } from "maplibre-gl";
  import type { Polygon, MultiPolygon, FeatureCollection } from "geojson";
  import ListFiles from "./ListFiles.svelte";

  let gj: FeatureCollection<
    Polygon | MultiPolygon,
    { kind: "LAD" | "REGION"; name: string }
  > = {
    type: "FeatureCollection" as const,
    features: [],
  };
  let ladNames: string[] = [];
  let regionNames: string[] = [];
  let kind = "LAD";

  onMount(async () => {
    // For govuk components. Must happen here.
    initAll();

    let resp = await fetch(boundariesUrl);
    gj = await resp.json();

    for (let f of gj.features) {
      if (f.properties.kind == "LAD") {
        ladNames.push(f.properties.name);
      } else {
        regionNames.push(f.properties.name);
      }
    }
    ladNames.sort();
    regionNames.sort();
    ladNames = ladNames;
    regionNames = regionNames;
  });

  function onClick(e: CustomEvent<LayerClickInfo>) {
    let props = e.detail.features[0].properties!;
    window.location.href = `sketch.html?boundary=${props.kind}_${props.name}`;
  }

  let bounds = window.location.hash
    ? undefined
    : ([-8.943, 54.631, -0.901, 59.489] as LngLatBoundsLike);
  let params = new URLSearchParams(window.location.search);
  let errorMessage = params.get("error") || "";
</script>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-one-half left govuk-prose">
    <h2>NPT Scheme Sketcher</h2>
    <p>
      This is an
      <a href="https://github.com/nptscot/scheme-sketcher" target="_blank">
        open source project
      </a>
      project developed by
      <a href="https://github.com/dabreegster/" target="_blank">
        Dustin Carlino
      </a>
      .
    </p>

    <ErrorMessage {errorMessage} />

    <Radio
      legend="Boundary type"
      choices={[
        ["LAD", "Local Authority Districts"],
        ["REGION", "Regions"],
      ]}
      inlineSmall
      bind:value={kind}
    />

    <p>Choose a boundary below or on the map to begin sketching:</p>
    <ul style="columns: 3">
      {#if kind == "LAD"}
        {#each ladNames as name}
          <li><a href="sketch.html?boundary=LAD_{name}">{name}</a></li>
        {/each}
      {:else}
        {#each regionNames as name}
          <li><a href="sketch.html?boundary=REGION_{name}">{name}</a></li>
        {/each}
      {/if}
    </ul>

    <hr />

    <p>Or continue with a previously opened file:</p>

    <ListFiles />
  </div>
  <div class="govuk-grid-column-one-half">
    <div id="map">
      <MapLibre
        style="https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key=MZEJTanw3WpxRvt7qDfo"
        {bounds}
        standardControls
        hash
        on:error={(e) => {
          // @ts-ignore ErrorEvent isn't exported
          console.log(e.detail.error);
        }}
      >
        <GeoJSON data={gj} generateId>
          <FillLayer
            filter={["==", ["get", "kind"], kind]}
            paint={{
              "fill-color": "rgb(200, 100, 240)",
              "fill-outline-color": "rgb(200, 100, 240)",
              "fill-opacity": hoverStateFilter(0.0, 0.5),
            }}
            manageHoverState
            hoverCursor="pointer"
            on:click={onClick}
          >
            <Popup let:data openOn="hover">
              {#if data}
                <p>{data.properties?.name}</p>
              {/if}
            </Popup>
          </FillLayer>
          <LineLayer
            filter={["==", ["get", "kind"], kind]}
            paint={{
              "line-color": "rgb(200, 100, 240)",
              "line-width": 2.5,
            }}
            manageHoverState
          />
        </GeoJSON>
      </MapLibre>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .left {
    padding: 30px;
    height: 100vh;
    overflow-y: scroll;
  }

  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50%;
  }
</style>
