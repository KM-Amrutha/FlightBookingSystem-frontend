import React from "react";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import useAdminDashboard from "../../hooks/useAdminDashboard";

const AdminDashboardPage: React.FC = () => {
  const {
    pendingProviders,
    isLoading,
    handleVerifyProvider,
    handleRejectProvider,
  } = useAdminDashboard();

  return (
    <AdminDashboard
      pendingProviders={pendingProviders}
      onVerifyProvider={handleVerifyProvider}
      onRejectProvider={handleRejectProvider}
      isLoading={isLoading}
    />
  );
};

export default AdminDashboardPage;
