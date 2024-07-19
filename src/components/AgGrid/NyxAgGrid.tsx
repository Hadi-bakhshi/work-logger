import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional Theme applied to the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import NyxAgGridSkeleton from './components/NyxAgGridSkeleton';
import { defaultColDef, LOCAL } from './config/NyxAgGridConfig';
// import { icons } from "./Icons/Icon";
import './NyxAgGrid.scss';
import { NyxAgGridType } from './NyxAgGrid.type';
// import { icons } from "./Icons/Icon";
import NyxTableTop from './components/NyxTableTop';
import { icons } from './icons/Icon';

const NyxAgGrid = (props: NyxAgGridType) => {
  const [searchValue, setSearchValue] = useState('');

  // translate filter text to local text
  // const localeText = useMemo(() => {
  //   return LOCAL;
  // }, []);

  // this ref defined to access ag-grid APIs
  const gridRef = useRef<AgGridReact>(null);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    gridRef.current!.api.setGridOption(`quickFilterText`, e.target.value);
  };

  const sizeToFit = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    if (props.sizeToFit) {
      sizeToFit();
    }
  }, []);

  const getParams = () => {
    return {
      fileName: `${props.title}` || 'exportedData',
    };
  };

  const onButtonExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv(getParams());
  }, []);

  if (props.loading) {
    return (
      <div className='nyx_table_global'>
        <div
          className='nyx_table_container'
          style={{
            height: props.height ? props.height : '100%',
            width: props.width ? props.width : '100%',
          }}
        >
          <NyxAgGridSkeleton theme={props.theme} />
        </div>
      </div>
    );
  }

  return (
    <div className='nyx_table_global'>
      <div
        className='nyx_table_container'
        style={{
          height: props.height ? props.height : '100%',
          width: props.width ? props.width : '100%',
        }}
      >
        <>
          {/* top of the table contain title and table header */}
          {props.toolbar && (
            <NyxTableTop
              title={props.title}
              search
              searchValue={searchValue}
              handleChangeSearch={handleChangeSearch}
              onButtonExport={onButtonExport}
              CTAComponent={props.CTAComponent}
            />
          )}

          {/* render table */}
          {props.rows.length > 0 ? (
            <div
              className={props.agGridClassName ? props.agGridClassName : ' ag-theme-alpine'}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={props.rows}
                columnDefs={props.columns}
                // enableRtl={true}
                defaultColDef={defaultColDef}
                pagination={props.pagination}
                paginationAutoPageSize={props.paginationAutoPageSize}
                // localeText={localeText}
                rowHeight={props.rowHeight || 50}
                rowSelection={'multiple'}
                suppressRowClickSelection={true}
                onFirstDataRendered={onFirstDataRendered}
                onRowSelected={props.onRowSelected}
                icons={icons}
                suppressMenuHide={true}
              />
            </div>
          ) : (
            <div
              className={props.agGridClassName ? props.agGridClassName : ' ag-theme-alpine'}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <AgGridReact
                rowData={[]}
                columnDefs={props.columns}
                // enableRtl={true}
                defaultColDef={defaultColDef}
                overlayNoRowsTemplate='No data to show'
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default NyxAgGrid;
