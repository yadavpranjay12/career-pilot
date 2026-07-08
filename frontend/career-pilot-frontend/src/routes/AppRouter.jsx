import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { Dashboard } from '../pages/dashboard/Dashboard';

// 1. IMPORT THE NEW COMPANIES PAGE
import { Companies } from '../pages/company/Companies';

// Placeholders preventing crash before next phases
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
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            
            {/* 2. REPLACE THE PLACEHOLDER WITH THE ACTUAL ROUTE */}
            <Route path="/companies" element={<Companies />} />
            
            <Route path="/applications" element={<Placeholder title="Applications Module" />} />
            <Route path="/learning" element={<Placeholder title="Learning Module" />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};