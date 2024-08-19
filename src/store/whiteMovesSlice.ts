import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovesState {
  whiteMoves: string[];
}

const initialState: MovesState = {
  whiteMoves: [],
};

export const whiteMovesSlice = createSlice({
  name: 'whiteMoves',
  initialState,
  reducers: {
    setWhiteMoves: (state, action: PayloadAction<string>) => {
      state.whiteMoves = [...state.whiteMoves, action.payload];
    },
    clearWhiteMoves: (state) => {
      state.whiteMoves = [];
    },
  },
});

export const { setWhiteMoves, clearWhiteMoves } = whiteMovesSlice.actions;
export default whiteMovesSlice.reducer;
