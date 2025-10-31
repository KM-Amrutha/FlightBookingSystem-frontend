import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { RequestVerifyProvider, RequestRejectProvider } from "./adminTypes";

export const getPendingProviders = createAsyncThunk(
  "admin/getPendingProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/providers/pending");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch pending providers");
      }
    }
  }
);

export const verifyProvider = createAsyncThunk(
  "admin/verifyProvider",
  async ({ providerId }: RequestVerifyProvider, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/providers/${providerId}/verify`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify provider");
      }
    }
  }
);

export const rejectProvider = createAsyncThunk(
  "admin/rejectProvider",
  async ({ providerId }: RequestRejectProvider, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/providers/${providerId}/reject`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to reject provider");
      }
    }
  }
);
