import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiTarget } from 'react-icons/fi';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-5">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 saas-bg-primary rounded-3xl flex items-center justify-center shadow-xl shadow-orange-500/20">
              <FiTarget className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Welcome to <span className="text-orange-600">CareerPilot</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Your complete career operating system. Track your job applications, master your interview prep, and crush your goals all in one place.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Login Card */}
          <Link
            to="/login"
            className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiLogIn className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Welcome Back</h2>
            <p className="text-slate-500 mb-8 px-4">
              Sign in to your account to pick up right where you left off on your career journey.
            </p>
            <span className="w-full mt-auto py-3.5 px-6 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
              Go to Login
            </span>
          </Link>

          {/* Register Card */}
          <Link
            to="/register"
            className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiUserPlus className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">New Here?</h2>
            <p className="text-slate-500 mb-8 px-4">
              Create an account today and start building out your structured career roadmap.
            </p>
            <span className="w-full mt-auto py-3.5 px-6 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              Create an Account
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};