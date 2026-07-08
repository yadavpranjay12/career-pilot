import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

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
            <Route path="/" element={<Placeholder title="Dashboard" />} />
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