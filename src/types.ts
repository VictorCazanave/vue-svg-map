// TODO: Extend @types/svg-maps__common?
export interface Map {
  viewBox: string;
  locations: Location[];
  label?: string;
}

export interface Location {
  id: string;
  path: string;
  name?: string;

  // Allow to store any additionnal data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
