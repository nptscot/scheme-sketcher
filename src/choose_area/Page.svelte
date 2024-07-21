<script lang="ts">
  import "../style/main.css";
  // @ts-expect-error no declarations
  import { initAll } from "govuk-frontend";
  import { onMount } from "svelte";
  import { ErrorMessage } from "govuk-svelte";
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

  let gj: FeatureCollection<Polygon | MultiPolygon, { LAD23NM: string }> = {
    type: "FeatureCollection" as const,
    features: [],
  };
  let boundaryNames: string[] = [];

  onMount(async () => {
    // For govuk components. Must happen here.
    initAll();

    let resp = await fetch(boundariesUrl);
    gj = await resp.json();

    boundaryNames = gj.features.map((f) => f.properties.LAD23NM);
    boundaryNames.sort();
  });

  function onClick(e: CustomEvent<LayerClickInfo>) {
    window.location.href = `sketch.html?boundary=${
      e.detail.features[0].properties!.LAD23NM
    }`;
  }

  let bounds = window.location.hash
    ? undefined
    : ([-8.943, 54.631, -0.901, 59.489] as LngLatBoundsLike);
  let params = new URLSearchParams(window.location.search);
  let errorMessage = params.get("error") || "";
</script>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-one-half left">
    <p>TODO, insert instructions / text</p>
    <ErrorMessage {errorMessage} />

    <p>Choose a boundary below or on the map to begin sketching:</p>
    <ul>
      {#each boundaryNames as name}
        <li><a href="sketch.html?boundary={name}">{name}</a></li>
      {/each}
    </ul>
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
            paint={{
              "fill-color": "rgb(200, 100, 240)",
              "fill-outline-color": "rgb(200, 100, 240)",
              "fill-opacity": hoverStateFilter(0.0, 0.5),
            }}
            manageHoverState
            hoverCursor="pointer"
            on:click={onClick}
          >
            <Popup let:features openOn="hover">
              {#if features}
                <p>{features[0].properties.LAD23NM}</p>
              {/if}
            </Popup>
          </FillLayer>
          <LineLayer
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
    margin: 10px;
  }

  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50%;
  }
</style>
