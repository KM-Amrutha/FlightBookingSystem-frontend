import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
} from "../redux/admin/adminThunk";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const useAdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingProviders, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(getPendingProviders());
  }, [dispatch]);


  const handleVerifyProvider = async (providerId: string) => {
    try {
      const response = await dispatch(
        verifyProvider({ providerId })
      ).unwrap();
      showSuccessToast(response.message || "Provider verified successfully");
      dispatch(getPendingProviders());
    } catch (error: any) {
      showErrorToast(error || "Failed to verify provider");
    }
  };

  const handleRejectProvider = async (providerId: string) => {
    try {
      const response = await dispatch(
        rejectProvider({ providerId })
      ).unwrap();
      showSuccessToast(response.message || "Provider rejected successfully");
       dispatch(getPendingProviders());
      
    } catch (error:any) {
      showErrorToast(error || "Failed to reject provider");
    }
  };

  return {
    pendingProviders,
    isLoading,
    error,
    handleVerifyProvider,
    handleRejectProvider,
  };
};

export default useAdminDashboard;
