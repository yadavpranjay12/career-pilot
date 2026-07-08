import React from 'react';
import { EmptyState } from '../../../components/ui/States';

const STATUS_STYLES = {
  OFFER: 'bg-green-100 text-green-800',
  INTERVIEW: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  APPLIED: 'bg-blue-100 text-blue-800',
  SAVED: 'bg-gray-100 text-gray-800',
  DEFAULT: 'bg-yellow-100 text-yellow-800'
};

export const RecentApplicationsWidget = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return <EmptyState message="No recent applications found." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{app.companyName}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{app.jobTitle}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[app.status] || STATUS_STYLES.DEFAULT}`}>
                  {app.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {new Date(app.applicationDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};