import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeFormat {
  timeFormat: number;
}

const initialState: TimeFormat = {
  timeFormat: 300,
};

export const timeFormatSlice = createSlice({
  name: 'blackMoves',
  initialState,
  reducers: {
    setTimeFormat: (state, action: PayloadAction<number>) => {
      state.timeFormat = action.payload;
    },
  },
});

export const { setTimeFormat } = timeFormatSlice.actions;
export default timeFormatSlice.reducer;
