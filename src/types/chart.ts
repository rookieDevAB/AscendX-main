
export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  dataKey: string;
  stroke?: string;
  fill?: string;
  fillOpacity?: number;
}
