import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovesState {
  blackMoves: string[];
}

const initialState: MovesState = {
  blackMoves: [],
};

export const blackMovesSlice = createSlice({
  name: 'blackMoves',
  initialState,
  reducers: {
    setBlackMoves: (state, action: PayloadAction<string>) => {
      state.blackMoves = [...state.blackMoves, action.payload];
    },
    clearBlackMoves: (state) => {
      state.blackMoves = [];
    },
  },
});

export const { setBlackMoves, clearBlackMoves } = blackMovesSlice.actions;
export default blackMovesSlice.reducer;
