// src/components/DataGrid.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { fetchData } from '../redux/slice';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy"});

const DataGrid = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Product Name', field: 'title' },
    // Add more columns as needed
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <AgGridReact rowData={data} columnDefs={columnDefs} />
    </div>
  );
};

export default DataGrid;
