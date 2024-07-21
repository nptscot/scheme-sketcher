<script lang="ts">
  import { TextInput, Radio, Select, TextArea } from "govuk-svelte";
  import { type Config } from "scheme-sketcher-lib/config";
  import type { FeatureProps, Schemes } from "scheme-sketcher-lib/draw/types";
  import type { Writable } from "svelte/store";
  import type { NptFeature, NptScheme } from "./types";

  export let cfg: Config<NptFeature, NptScheme>;
  export let gjSchemes: Writable<Schemes<NptFeature, NptScheme>>;
  export let id: number;
  export let props: FeatureProps<NptFeature>;

  // @ts-expect-error Hide svelte-check warning
  let _ = id;
</script>

<TextInput label="Name" bind:value={props.name} />

<Select
  label="Scheme"
  choices={Object.values($gjSchemes.schemes).map((scheme) => [
    scheme.scheme_reference,
    cfg.schemeName(scheme),
  ])}
  bind:value={props.scheme_reference}
/>

<Radio
  legend="Infrastructure type"
  choices={[
    ["mixed-traffic-street", "Mixed Traffic Street"],
    ["detached-cycle-track", "Detached or Remote Cycle Track"],
    ["carriageway-cycle-track", "Cycle Track at Carriageway Level"],
    ["stepped-cycle-track", "Stepped or Footway Level Cycle Track"],
    ["light-segregation", "Light Segregation"],
    ["cycle-lane", "Cycle Lane"],
    ["", "Unknown"],
  ]}
  required
  bind:value={props.infrastructure_type}
/>

<TextArea label="Description" bind:value={props.description} />
