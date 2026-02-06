import { createSlice } from "@reduxjs/toolkit";
import type { CardState } from "../../types/card";
import { fetchBoardByHash, createBoard } from "../board/boardSlice";
import { createCard, deleteCard, moveCard, updateCard } from "./cardsAPI";

const initialState: CardState = {
    items: []
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        clearCards: state => {
            state.items = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBoardByHash.fulfilled, (state, action) => {
                state.items = action.payload.cards || [];
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.items = action.payload.cards || [];
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                const idx = state.items.findIndex(c => c._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c._id !== action.payload);
            })
            .addCase(moveCard.fulfilled, (state, action) => {
                const idx = state.items.findIndex(c => c._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            });
    },
})

export const { clearCards } = cardSlice.actions;
export default cardSlice.reducer;