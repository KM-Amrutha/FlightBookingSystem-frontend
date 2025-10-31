import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
} from "./adminThunk";

const initialState: AdminState = {
  users: [],
  providers: [],
  pendingProviders: [],
  isLoading: false,
  error: null,
  userDetails: {},
  providerDetails: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getPendingProviders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPendingProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingProviders = action.payload.data;
        state.error = null;
      })
      .addCase(getPendingProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch pending providers";
      })

      
      .addCase(verifyProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.isLoading = false;
        const verifiedProviderId = action.payload.data?._id;
        
        state.pendingProviders = state.pendingProviders.filter(
          (provider) => provider._id !== verifiedProviderId
        );
        state.error = null;
      })
      .addCase(verifyProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to verify provider";
      })

      
      .addCase(rejectProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectProvider.fulfilled, (state, action) => {
        state.isLoading = false;
        const rejectedProviderId = action.payload.data?._id;
    
        state.pendingProviders = state.pendingProviders.filter(
          (provider) => provider._id !== rejectedProviderId
        );
        state.error = null;
      })
      .addCase(rejectProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to reject provider";
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
