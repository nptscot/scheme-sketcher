import { type Config } from "scheme-sketcher-lib/config";
import type { NptFeature, NptScheme } from "./types";
import type {
  FeatureWithID,
  SchemeData,
  Schemes,
} from "scheme-sketcher-lib/draw/types";
import FeatureForm from "./FeatureForm.svelte";
import SchemeForm from "./SchemeForm.svelte";

export let cfg: Config<NptFeature, NptScheme> = {
  interventionName,

  schemeName: (s) => s.scheme_name,

  backfill: (json) => json,

  initializeEmptyScheme: (scheme) => {
    let s = scheme as SchemeData & NptScheme;
    s.scheme_name = "";
    return s;
  },

  // TODO Required type not set
  interventionWarning: (feature) => null,

  editFeatureForm: FeatureForm,

  editSchemeForm: SchemeForm,

  newPointFeature: (f) => {
    f.properties.infrastructure_type = "";
  },
  newPolygonFeature: (f) => {
    f.properties.infrastructure_type = "";
  },
  newLineStringFeature: (f) => {
    f.properties.infrastructure_type = "";
  },

  updateFeature: (destination, source) => {},

  // TODO Switch to another
  maptilerApiKey: "MZEJTanw3WpxRvt7qDfo",

  getStreetViewRoadLayerNames: (map) =>
    map
      .getStyle()
      .layers.filter(
        // @ts-expect-error source-layer is present
        (layer) => layer["source-layer"] == "roads" && layer.type == "line",
      )
      .map((layer) => layer.id),

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

    // From the basemap
    "Road labels",

    // Draw the inverted boundary fade on top of basemap labels
    "boundary",

    // TODO This might look nicer lower
    "georeferenced-image",
  ],
};

function interventionName(feature: FeatureWithID<NptFeature>): string {
  if (feature.properties.name) {
    return feature.properties.name;
  }
  if (feature.geometry.type == "Point") {
    return "untitled point";
  } else if (feature.geometry.type == "LineString") {
    return "untitled route";
  } else {
    return "untitled area";
  }
}

// These two are for file management
export function validate(state: Schemes<NptFeature, NptScheme>) {}
export function describe(state: Schemes<NptFeature, NptScheme>): string {
  let plural1 = state.features.length == 1 ? "" : "s";
  let plural2 = Object.keys(state.schemes).length == 1 ? "" : "s";
  return `${state.features.length} intervention${plural1} in ${Object.keys(state.schemes).length} scheme${plural2}`;
}
