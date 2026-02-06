// features/cards/cardsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { CardState } from "../../types/card";
import { fetchBoardByHash, createBoard } from "../board/boardSlice";
import { createCard, deleteCard, moveCard, updateCard } from "./cardsAPI";

const initialState: CardState = {
    items: []
}

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        clearCards: state => {
            state.items = [];
        },
        optimisticMoveCard: (state, action) => {
            const { cardId, columnId, position } = action.payload;
            const card = state.items.find(c => c._id === cardId);
            if (card) {
                card.columnId = columnId;
                card.position = position;
            }
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
            .addCase(moveCard.pending, (state, action) => {
                const { cardId, columnId, position } = action.meta.arg;
                const card = state.items.find(c => c._id === cardId);
                if (card) {
                    card.columnId = columnId;
                    card.position = position;
                }
            })
            .addCase(moveCard.fulfilled, (state, action) => {
                const idx = state.items.findIndex(c => c._id === action.payload._id);
                if (idx !== -1) {
                    state.items[idx] = action.payload;
                }
            })
            .addCase(moveCard.rejected, (state, action) => {
                console.error('Move failed:', action.error);
            });
    },
})

export const { clearCards, optimisticMoveCard } = cardSlice.actions;
export default cardSlice.reducer;