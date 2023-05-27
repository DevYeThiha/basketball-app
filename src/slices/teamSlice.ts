import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "@/next-redux-wrapper";

export interface Team {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
}

// Type of state
export interface TeamState {
  data: Team[] | [];
}

// Initial state
const initialState: TeamState = {
  data: [],
};

// Actual Slice
export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam(state, action) {
      const newTeam = {
        ...action.payload,
        id: crypto.randomUUID(),
        player_count: 0,
      } as Team;
      const data = [...state.data];
      data.unshift(newTeam);
      state.data = data;
      return state;
    },
    editTeam(state, action) {
      if (action.payload.id) {
        const team = { ...action.payload } as Team;

        state.data = [...state.data.map((item) =>
          item.id == team.id ? team : item
        )];
        return state;
      }
    },
    deleteTeam(state, action) {
      const newState = state.data.filter(
        (item) => item.id != action.payload.id
      );
      state.data = [...newState];
      return state;
    },
    resetTeam(state){
      state.data = [];
      return state;
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.teams,
      };
    },
  },
});

export const { createTeam, editTeam, deleteTeam, resetTeam } = teamSlice.actions;

export const selectTeamState = (state: AppState) => state.teams.data;

export default teamSlice.reducer;
