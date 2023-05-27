import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "@/next-redux-wrapper";

export interface TeamPlayer {
  teamId: number | string;
  playerId: number | string;
}

// Type of state
export interface TeamPlayerState {
  data: TeamPlayer[];
}

// Initial state
const initialState: TeamPlayerState = {
  data: [],
};

// Actual Slice
export const teamPlayerSlice = createSlice({
  name: "team-player",
  initialState,
  reducers: {
    addTeamPlayer(state, action) {
      const data = action.payload as TeamPlayer;
      if(data.playerId && data.teamId){
        const oldTeam = state.data.findIndex(item => item.playerId == data.playerId);
        if(oldTeam > -1){
          state.data.splice(oldTeam, 1);
        }
        state.data.push(data);
        return state;
      }
    },
    resetTeamPlayers(state){
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

export const { addTeamPlayer, resetTeamPlayers } = teamPlayerSlice.actions;

export const selectTeamPlayerState = (state: AppState) => state["team-player"].data;

export default teamPlayerSlice.reducer;
