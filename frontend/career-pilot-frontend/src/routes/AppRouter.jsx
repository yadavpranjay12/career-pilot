import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

// 1. Add the Dashboard import here
import { Dashboard } from '../pages/dashboard/Dashboard';

// Placeholders for remaining phases
const Placeholder = ({ title }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-500 mt-2">Implementation pending in next phase.</p>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Only accessible when NOT logged in) */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            
            {/* 2. Replace the Dashboard placeholder with the actual component */}
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/companies" element={<Placeholder title="Company Module" />} />
            <Route path="/applications" element={<Placeholder title="Applications Module" />} />
            <Route path="/learning" element={<Placeholder title="Learning Module" />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};