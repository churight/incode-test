import { createSlice } from "@reduxjs/toolkit";
import type { ColumnState } from "../../types/column";
import { fetchBoardByHash, createBoard } from "../board/boardSlice";

const initialState: ColumnState = {
    items: [],
    loading: false,
    error: null
}

const columnSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        clearColumns: state => {
            state.items = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBoardByHash.fulfilled, (state, action) => {
                state.items = action.payload.columns || [];
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.items = action.payload.columns || [];
            });
    }
});

export const { clearColumns } = columnSlice.actions;
export default columnSlice.reducer;