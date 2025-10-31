import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedProvider:React.FC = () => {
    const provider = useSelector((state: RootState) => state?.auth?.provider)

    return !provider ? (
      <Navigate to="/" />
    ) : provider.role !== "provider" ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    );
}

export default ProtectedProvider
