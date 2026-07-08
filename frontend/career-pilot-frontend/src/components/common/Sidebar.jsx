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
    <aside className="w-64 shrink-0 bg-white border-r border-orange-100 hidden lg:flex flex-col shadow-sm z-20">
      <div className="h-20 shrink-0 flex items-center px-8 border-b border-orange-50">
        <h1 className="text-2xl font-black tracking-tighter text-orange-600">CareerPilot</h1>
      </div>
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-orange-50 text-orange-600 font-bold shadow-sm border border-orange-100' 
                  : 'text-slate-500 hover:bg-orange-50/50 hover:text-orange-500 font-semibold border border-transparent'
              }`
            }
          >
            {link.icon}
            <span className="text-base">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};