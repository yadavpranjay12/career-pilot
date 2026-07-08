import { NavLink } from 'react-router-dom';
import { FiHome, FiBriefcase, FiFileText, FiTarget } from 'react-icons/fi';

export const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Companies', path: '/companies', icon: <FiBriefcase className="w-5 h-5" /> },
    { name: 'Applications', path: '/applications', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Learning', path: '/learning', icon: <FiTarget className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight text-blue-500">CareerPilot</h1>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};