import React from "react";
import Sidebar from "./Sidebar";

interface Provider {
  _id: string;
  companyName: string;
  email: string;
  airlineCode: string;
  mobile: string;
}

interface AdminDashboardProps {
  pendingProviders: Provider[];
  onVerifyProvider: (providerId: string) => void;
  onRejectProvider: (providerId: string) => void;
  isLoading: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  pendingProviders,
  onVerifyProvider,
  onRejectProvider,
  isLoading,
}) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Skylife Admin</h1>
          <p className="text-slate-300">Provider Verification Dashboard</p>
        </div>

        {/* Pending Providers Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pending Provider Verifications
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Loading providers...</p>
            </div>
          ) : pendingProviders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No pending verifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProviders.map((provider) => (
                <div
                  key={provider._id}
                  className="bg-slate-50 rounded-2xl p-6 flex items-center justify-between hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {provider.companyName}
                    </h3>
                    <p className="text-sm text-slate-600 mb-1">
                      <span className="font-semibold">Email:</span> {provider.email}
                    </p>
                    <p className="text-sm text-slate-600 mb-1">
                      <span className="font-semibold">Mobile:</span> {provider.mobile}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Airline Code:</span>{" "}
                      {provider.airlineCode}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onVerifyProvider(provider._id)}
                      className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => onRejectProvider(provider._id)}
                      className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
