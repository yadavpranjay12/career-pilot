import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data) => {
    try {
      setApiError('');
      await login(data);
      navigate('/', { replace: true });
    } catch (error) {
      setApiError(error.response?.data?.detail || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Sign in to your account</h3>
      
      {apiError && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md text-center">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
};