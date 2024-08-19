import { configureStore } from '@reduxjs/toolkit';
import blackMovesSlice from './blackMovesSlice';
import whiteMovesSlice from './whiteMovesSlice';
import timeFormatSlice from './timeFormatSlice';

export const store = configureStore({
  reducer: {
    blackMoves: blackMovesSlice,
    whiteMoves: whiteMovesSlice,
    timeFormat: timeFormatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
