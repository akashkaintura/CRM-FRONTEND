import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Payroll from './components/Payroll';
import Leaves from './components/Leaves';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/Signup';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard or login depending on authentication */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/payroll" element={<Payroll />} />
          <Route path="/leaves" element={<Leaves />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
