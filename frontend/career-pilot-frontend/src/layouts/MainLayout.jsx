import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';

export const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      {/* flex-col ensures Navbar naturally sits above the main content without overlapping */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Navbar />
        {/* overflow-y-auto restricts scrolling to this container only. justify-center removed. */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 flex flex-col items-start justify-start">
          <div className="max-w-[1400px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};