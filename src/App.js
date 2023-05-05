import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { DetailPage, HomePage } from './components';

const App = () => {
  return (
    <div
      style={{
        margin: '5% auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />,
          <Route path="/detail/:id" element={<DetailPage />} />,
          <Route path="*" element={<Navigate to="/home" replace />} />,
        </Routes>
      </Router>
    </div>
  );
};

export default App;
