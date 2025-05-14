import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Layout>
                <UsersList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users/:id" element={
            <ProtectedRoute>
              <Layout>
                <UserDetails />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;