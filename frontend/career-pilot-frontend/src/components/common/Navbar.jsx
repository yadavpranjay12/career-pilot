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
    <header className="shrink-0 h-20 bg-white border-b border-orange-100 flex items-center justify-between px-6 lg:px-10 z-10 shadow-sm">
      <h2 className="text-2xl font-black tracking-tighter text-orange-600 lg:hidden">CareerPilot</h2>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <button className="p-2.5 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors border border-orange-100">
          <FiUser className="w-5 h-5" />
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 lg:space-x-3 px-4 py-2.5 text-orange-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold border border-transparent hover:border-red-100"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};