export interface ElementoTabla {
  id: string | number;
  title: string;
  date: string | Date;
  size: number | string;
  type?: string;
  trimester?: string;
  year?: string | number;
}