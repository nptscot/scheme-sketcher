export interface NptFeature {
  name: string;
  description: string;
  likelihood: "moonshot" | "maybe" | "definitely" | "";
}

export interface NptScheme {
  scheme_name: string;
}
