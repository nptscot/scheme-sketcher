<script lang="ts">
  import "../style/main.css";
  import { MapLibre } from "svelte-maplibre";
  import { type Config, map } from "scheme-sketcher-lib/config";
  import {
    ImageLayer,
    InterventionLayer,
    PolygonToolLayer,
    RouteSnapperLayer,
    SplitRouteMode,
    BoundaryLayer,
    Toolbox,
  } from "scheme-sketcher-lib/draw";
  import { mode, emptySchemes } from "scheme-sketcher-lib/draw/stores";
  import { PerModeControls } from "scheme-sketcher-lib/sidebar";
  import { writable } from "svelte/store";
  import boundariesUrl from "../../assets/boundaries.geojson?url";
  import { onMount } from "svelte";
  // @ts-expect-error no declarations
  import { initAll } from "govuk-frontend";
  import { cfg } from "./config";

  let params = new URLSearchParams(window.location.search);
  // TODO Add validation and some kind of error page
  let boundaryName: string = params.get("boundary")!;

  let boundaryGeojson = { type: "FeatureCollection" as const, features: [] };

  onMount(async () => {
    // For govuk components. Must happen here.
    initAll();

    let resp = await fetch(boundariesUrl);
    let gj = await resp.json();
    gj.features = gj.features.filter(
      (f) => f.properties.LAD23NM == boundaryName,
    );
    if (gj.features.length === 0) {
      // TODO Make the error page
      window.location.href = `index.html?error=Boundary name not found: ${boundaryName}`;
    }
    boundaryGeojson = gj;
  });

  let routeSnapperUrl = `https://atip.uk/npt_tmp/${boundaryName}.bin.gz`;

  let gjSchemes = writable(emptySchemes(cfg));
</script>

<div style="display: flex; height: 100vh">
  <div class="sidebar">
    {#if $mode.mode == "list"}
      <h2>NPT Scheme Sketcher</h2>
      <p>
        {boundaryName} (
        <a href="index.html">Change area</a>
        )
      </p>
    {/if}

    <PerModeControls {cfg} {gjSchemes} {routeSnapperUrl} />
  </div>
  <div class="map">
    <MapLibre
      style="https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key={cfg.maptilerApiKey}"
      standardControls
      on:error={(e) => {
        // @ts-expect-error Not exported
        console.log(e.detail.error);
      }}
      bind:map={$map}
    >
      <BoundaryLayer {cfg} {boundaryGeojson} fitBoundsAtStart />
      <InterventionLayer {cfg} {gjSchemes} />
      <ImageLayer {cfg} />
      {#if $mode.mode == "list"}
        <Toolbox {cfg} {gjSchemes} />
      {:else if $mode.mode == "split-route"}
        <SplitRouteMode {cfg} {gjSchemes} />
      {/if}
      <RouteSnapperLayer {cfg} />
      <PolygonToolLayer {cfg} />
    </MapLibre>
  </div>
</div>

<style>
  .sidebar {
    width: 30%;
    overflow-y: scroll;
    padding: 10px;
  }

  .map {
    position: relative;
    width: 70%;
  }
</style>
