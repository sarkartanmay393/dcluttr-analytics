export type VisualizationType = 'linechart' | 'semipiechart' | 'table';

export interface GridstackProperties {
  x: number;
  w: number;
}

export interface DatatableProperties {
  columnOrder: string[];
  columnsPinned: string[];
  columnsVisible: Record<string, boolean>;
}

export interface Card {
  visualizationType: VisualizationType;
  title: string;
  id: string;
  logo?: string;
  description?: string;
  gridstackProperties: GridstackProperties;
  query: string[];
  datatableProperties?: DatatableProperties;
  active: boolean;
}

export interface DashboardConfig {
  id: string;
  brandId: string;
  name: string;
  description?: string;
  logo?: string;
  active: boolean;
  cards: Card[];
} 