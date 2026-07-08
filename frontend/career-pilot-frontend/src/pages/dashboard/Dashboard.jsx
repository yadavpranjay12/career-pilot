import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { LoadingState, ErrorState } from '../../components/ui/States';
import { ApplicationStatusChart } from './charts/ApplicationStatusChart';
import { GoalProgressChart } from './charts/GoalProgressChart';
import { RecentApplicationsWidget } from './widgets/RecentApplicationsWidget';
import { UpcomingGoalsWidget } from './widgets/UpcomingGoalsWidget';
import { 
  FiBriefcase, 
  FiFileText, 
  FiAward, 
  FiTarget, 
  FiCode, 
  FiActivity, 
  FiCheckCircle 
} from 'react-icons/fi';

export const Dashboard = () => {
  const { stats, recentApplications, upcomingGoals, isLoading, error, refetch } = useDashboard();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!stats) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl saas-heading mb-3">Welcome back.</h1>
        <p className="text-lg saas-subheading">Here is the latest overview of your career progress and applications.</p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <StatCard 
          title="Total Applications" 
          value={stats.totalApplications} 
          icon={<FiFileText />}
        />
        <StatCard 
          title="Companies Tracked" 
          value={stats.totalCompanies} 
          icon={<FiBriefcase />}
        />
        <StatCard 
          title="Interviews Secured" 
          value={stats.interviewCount} 
          icon={<FiAward />}
        />
        <StatCard 
          title="Total Offers" 
          value={stats.offerCount} 
          icon={<FiTarget />}
        />
        <StatCard 
          title="Problems Solved" 
          value={stats.totalProblemsSolved} 
          icon={<FiCode />}
        />
        <StatCard 
          title="Active Goals" 
          value={stats.activeGoals} 
          icon={<FiActivity />}
        />
        <StatCard 
          title="Completed Goals" 
          value={stats.completedGoals} 
          icon={<FiCheckCircle />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="saas-card p-0 overflow-hidden flex flex-col h-full border-orange-100">
           <div className="p-8 border-b border-orange-50 bg-white">
              <h3 className="text-xl saas-heading">Applications by Status</h3>
           </div>
           <div className="p-6 h-[400px]">
             <ApplicationStatusChart statusMap={stats.applicationsByStatus} />
           </div>
        </div>
        
        <div className="saas-card p-0 overflow-hidden flex flex-col h-full border-orange-100">
           <div className="p-8 border-b border-orange-50 bg-white">
              <h3 className="text-xl saas-heading">Active Goal Progress</h3>
           </div>
           <div className="p-6 h-[400px]">
             <GoalProgressChart goals={upcomingGoals} />
           </div>
        </div>
      </div>

      {/* Widgets Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 saas-card p-0 overflow-hidden flex flex-col h-full border-orange-100">
          <div className="p-8 border-b border-orange-50 bg-white">
            <h3 className="text-xl saas-heading">Recent Applications</h3>
          </div>
          <div className="flex-1 p-0 overflow-y-auto">
            <RecentApplicationsWidget applications={recentApplications} />
          </div>
        </div>

        <div className="xl:col-span-1 saas-card p-0 overflow-hidden flex flex-col h-full border-orange-100">
          <div className="p-8 border-b border-orange-50 bg-white">
            <h3 className="text-xl saas-heading">Upcoming Goals</h3>
          </div>
          <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
            <UpcomingGoalsWidget goals={upcomingGoals} />
          </div>
        </div>
      </div>

    </div>
  );
};