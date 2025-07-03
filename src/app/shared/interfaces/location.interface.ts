export interface Location {
  value: string;
  label: string;
  type: Type;
  provinces?: Location[];
  districts?: Location[];
}

export type Type = 'department' | 'district' | 'province';
