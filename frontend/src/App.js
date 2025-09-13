import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import Layout from './components/layout/Layout';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import Implementation from './components/Implementation';
import Monitoring from './components/Monitoring';
import AssetManagement from './components/AssetManagement';
import Reporting from './components/Reporting';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/planning" element={<Layout><Planning /></Layout>} />
            <Route path="/implementation" element={<Layout><Implementation /></Layout>} />
            <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
            <Route path="/asset-management" element={<Layout><AssetManagement /></Layout>} />
            <Route path="/reporting" element={<Layout><Reporting /></Layout>} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;