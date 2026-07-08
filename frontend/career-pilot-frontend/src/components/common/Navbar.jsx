import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
      <h2 className="text-xl font-semibold text-gray-800 lg:hidden">CareerPilot</h2>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <FiUser className="w-5 h-5" />
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};