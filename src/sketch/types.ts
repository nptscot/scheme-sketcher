export interface NptFeature {
  name: string;
  description: string;
  // From https://nptscot.github.io/manual/#cyclingbydesigncompliance
  infrastructure_type:
    | "mixed-traffic-street"
    | "detached-cycle-track"
    | "carriageway-cycle-track"
    | "stepped-cycle-track"
    | "light-segregation"
    | "cycle-lane"
    | "";
}

export interface NptScheme {
  scheme_name: string;
}
