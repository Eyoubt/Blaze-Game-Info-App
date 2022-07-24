import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { popularGamesURL, newGamesURL, upcomingGamesURL } from "../api";
import axios from "axios";

const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
};

export const getGameItemsURL = createAsyncThunk(
  "games/getItemStatus",
  async (thunkAPI) => {
    const popularData = await axios.get(popularGamesURL());
    const newGamesData = await axios.get(newGamesURL());
    const upcomingData = await axios.get(upcomingGamesURL());
    thunkAPI({
      payload: {
        popular: popularData.data.results,
        upcoming: upcomingData.data.results,
        newGames: newGamesData.data.results,
      },
    });
  }
);

const gamesSlicer = createSlice({
  name: "games",
  initialState: initState,
  reducers: {
    fetchGames: (state, action) => {
      state.push({
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      });
    },
  },
});
export const { fetchGames } = gamesSlicer.actions;
export default gamesSlicer.reducer;
