<script lang="ts">
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
  import FeatureForm from "./FeatureForm.svelte";
  import SchemeForm from "./SchemeForm.svelte";
  import { writable } from "svelte/store";
  import type { NptFeature, NptScheme } from "./types";
  import type { SchemeData } from "scheme-sketcher-lib/draw/types";
  import boundariesUrl from "../../assets/boundaries.geojson?url";
  import { onMount } from "svelte";
  // @ts-expect-error no declarations
  import { initAll } from "govuk-frontend";

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

  // TODO Switch to another
  let apiKey = "MZEJTanw3WpxRvt7qDfo";
  let routeSnapperUrl = `https://atip.uk/npt_tmp/${boundaryName}.bin.gz`;

  let cfg: Config<NptFeature, NptScheme> = {
    interventionName: (f) => `some ${f.geometry.type} feature`,

    schemeName: (s) => s.scheme_name,

    backfill: (json) => json,

    initializeEmptyScheme: (scheme) => {
      let s = scheme as SchemeData & NptScheme;
      s.scheme_name = "";
      return s;
    },

    interventionWarning: (feature) => null,

    editFeatureForm: FeatureForm,

    editSchemeForm: SchemeForm,

    newPointFeature: (f) => {},
    newPolygonFeature: (f) => {},
    newLineStringFeature: (f) => {},

    updateFeature: (destination, source) => {},

    maptilerApiKey: apiKey,

    // TODO Fix this
    getStreetViewRoadLayerNames: (map) => ["Road network"],

    layerZorder: [
      // Polygons are bigger than lines, which're bigger than points. When geometry
      // overlaps, put the smaller thing on top
      "interventions-polygons",
      "interventions-polygons-outlines",
      // This is an outline, so draw on top
      "hover-polygons",

      // The hover effect thickens, so draw beneath
      "hover-lines",
      "interventions-lines",
      "interventions-lines-endpoints",

      "hover-points",
      "interventions-points",

      "edit-polygon-fill",
      "edit-polygon-lines",
      "edit-polygon-vertices",

      "draw-split-route",

      "route-points",
      "route-lines",
      "route-polygons",

      // TODO Fix
      "road_label",

      // Draw the inverted boundary fade on top of basemap labels
      "boundary",

      // TODO This might look nicer lower
      "georeferenced-image",
    ],
  };

  let gjSchemes = writable(emptySchemes(cfg));
</script>

<div style="display: flex; height: 100vh">
  <div class="sidebar">
    <PerModeControls {cfg} {gjSchemes} {routeSnapperUrl} />
  </div>
  <div class="map">
    <MapLibre
      style="https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key={apiKey}"
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
