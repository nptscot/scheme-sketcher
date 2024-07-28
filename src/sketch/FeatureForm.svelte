<script lang="ts">
  import { FormElement, SecondaryButton, Select, TextArea } from "govuk-svelte";
  import { type Config } from "scheme-sketcher-lib/config";
  import type { FeatureProps, Schemes } from "scheme-sketcher-lib/draw/types";
  import type { Writable } from "svelte/store";
  import type { NptFeature, NptScheme } from "./types";
  import { routeTool } from "scheme-sketcher-lib/draw/stores";
  import { v4 as uuidv4 } from "uuid";

  export let cfg: Config<NptFeature, NptScheme>;
  export let gjSchemes: Writable<Schemes<NptFeature, NptScheme>>;
  export let id: number;
  export let props: FeatureProps<NptFeature>;

  // @ts-expect-error Hide svelte-check warning
  let _ = id;

  // Sets the intervention name to "From {road1 and road2} to {road3 and
  // road4}". Only meant to be useful for routes currently.
  function autoFillName() {
    try {
      props.name = $routeTool!.inner.routeNameForWaypoints(props.waypoints);
    } catch (e) {
      window.alert(`Couldn't auto-name route: ${e}`);
    }
  }

  let nameId = uuidv4();
</script>

<FormElement label="Name" id={nameId}>
  <!-- Only LineStrings can be auto-named, and length_meters being set is the simplest proxy for that -->
  {#if props.length_meters}
    <div class="govuk-hint">
      If transcribing from a document, use the route name there if possible
    </div>
  {/if}

  <input type="text" class="govuk-input" id={nameId} bind:value={props.name} />

  {#if props.length_meters}
    <SecondaryButton on:click={() => autoFillName()} disabled={!$routeTool}>
      Auto-fill with street names
    </SecondaryButton>
  {/if}
</FormElement>

<Select
  label="Scheme"
  choices={Object.values($gjSchemes.schemes).map((scheme) => [
    scheme.scheme_reference,
    cfg.schemeName(scheme),
  ])}
  bind:value={props.scheme_reference}
/>

<Select
  label="Infrastructure type"
  choices={[
    ["mixed-traffic-street", "Mixed Traffic Street"],
    ["detached-cycle-track", "Detached or Remote Cycle Track"],
    ["carriageway-cycle-track", "Cycle Track at Carriageway Level"],
    ["stepped-cycle-track", "Stepped or Footway Level Cycle Track"],
    ["light-segregation", "Light Segregation"],
    ["cycle-lane", "Cycle Lane"],
    ["", "Unknown"],
  ]}
  bind:value={props.infrastructure_type}
/>

<TextArea label="Description" bind:value={props.description} />
