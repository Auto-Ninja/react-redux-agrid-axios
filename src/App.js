import React, { Component , useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import DataGrid from './components/DataGrid';
import DataForm from './components/DataForm';

const App = () => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const handleAdd = () => {
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleEdit = (data) => {
    setCurrentData(data);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };


  return (
    <Layout>
      <button onClick={handleAdd}>Add Data</button>
      {isFormOpen && (
        <DataForm
          isEdit={isEdit}
          currentData={currentData}
          onClose={handleClose}
        />
      )}
      <DataGrid onEdit={handleEdit} />
    </Layout>
  );
};

export default App;