import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/cards/cardSlice";
import columnReducer from "../features/columns/columnSlice";
import boardReducer from "../features/board/boardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer,
    cards: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
