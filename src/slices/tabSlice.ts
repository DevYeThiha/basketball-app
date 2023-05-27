import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "@/next-redux-wrapper";

// Type of state
export interface TabState {
  tabState: "player" | "team";
}

// Initial state
const initialState: TabState = {
  tabState: "player",
};

// Actual Slice
export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    // Action to set the tabentication status
    setTabState(state, action) {
      state.tabState = action.payload;
    },
    resetTabs(state){
      state.tabState = "player";
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.tab,
      };
    },
  },
});


export const { setTabState, resetTabs } = tabSlice.actions;

export const selectTabState = (state: AppState) => state.tab.tabState;

export default tabSlice.reducer;