import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoalPage } from '../pages/goal/GoalPage';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { ResumePage } from "../pages/resume/ResumePage";
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { ProfilePage } from "../pages/profile/ProfilePage";
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

import { Dashboard } from '../pages/dashboard/Dashboard';
import { Companies } from '../pages/company/Companies';
import { Applications } from '../pages/application/Applications';
import { ProblemPage } from '../pages/problem/ProblemPage';

// Placeholder pages for future modules
const Placeholder = ({ title }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-500 mt-2">
      Implementation pending in next phase.
    </p>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================== */}
        {/* Public Routes */}
        {/* ===================== */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* ===================== */}
        {/* Protected Routes */}
        {/* ===================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Goal Module */}
            <Route path="/goals" element={<GoalPage />} />

            {/* Company Module */}
            <Route path="/companies" element={<Companies />} />

            {/* Internship Application Module */}
            <Route path="/applications" element={<Applications />} />
<Route
    path="/problems"
    element={<ProblemPage />}
/>
            {/* Future Modules */}
           
<Route
    path="/resume"
    element={<ResumePage />}
/>
            <Route
              path="/interviews"
              element={<Placeholder title="Interview Module" />}
            />

           <Route
  path="/profile"
  element={<ProfilePage />}
/>

          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};