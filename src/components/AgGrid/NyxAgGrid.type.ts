import type { ColDef, RowSelectedEvent } from "ag-grid-community";
import React from "react";

export interface NyxAgGridType {
  rows: any[];
  columns: ColDef[];
  loading?: boolean;
  toolbar?: boolean;
  title?: string;
  height?: string;
  width?: string;
  agGridClassName?: string;
  pagination?: boolean;
  paginationAutoPageSize?: boolean;
  theme?: "light" | "dark";
  search?: boolean;
  rowHeight?: number;
  CTAComponent?: JSX.Element;
  middleComponent?: JSX.Element;
  noDataIcon?: React.ReactElement | null;
  sizeToFit?: boolean;
  context?: any;
  pinnedBottomRowData?: any[];
  onRowSelected?: (e: RowSelectedEvent) => void;
}
