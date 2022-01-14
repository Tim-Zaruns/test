import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Document from './pages/Document/Document';
import FormGenerator from './pages/FormGenarator/FormGenerator';
import ViewForm from './pages/ViewForm/ViewForm';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/form-generation" element={<FormGenerator />} />
        <Route path="/" element={<Navigate to="/document" />} />
        <Route path="/document" element={<Document />} />
        <Route path="/document/:id" element={<ViewForm />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
