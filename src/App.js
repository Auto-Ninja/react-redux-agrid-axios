import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import DataGrid from './components/DataGrid';

const App = () => {
  return (
    <Layout>
      <DataGrid />
    </Layout>
  );
};

export default App;