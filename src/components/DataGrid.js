// src/components/DataGrid.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { fetchProductData } from '../redux/productSlice';
import {fetchCategoryData } from '../redux/categorySlice';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy"});

const DataGrid = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  const categories  = useSelector((state) => state.categories);
  
  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [dispatch]);
  
  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Product Name', field: 'title' },
    { headerName: 'Category Name', field: 'category' },
    
    {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: (params) => (
          <button onClick={() => onEdit(params.data)}>Edit</button>
        ),
      },
    // Add more columns as needed
  ];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    alert(category)
    // Fetch and set states based on the selected country
    dispatch(fetchProductData(category));
  };

  return (
    <>
    <label>
      Pick a Category: 
      <select name="selectedCategory" onChange={handleCategoryChange}>
      <option value="">Select Category</option>
        {categories.data.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
        
      </select>
    </label>
    
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <AgGridReact rowData={data} columnDefs={columnDefs} />
    </div>
    </>
  );
};

export default DataGrid;
