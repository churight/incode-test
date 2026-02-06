import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { BoardState } from "../../types/board";

export const fetchBoardByHash = createAsyncThunk(
    'board/fetchByHash',
    async (hashId: string) => {
        const res = await axios.get(`http://localhost:4000/api/boards/${hashId}`);
        return res.data;
    }
);

export const createBoard = createAsyncThunk(
  'board/create',
  async (data:{
    name:string}
  ) => {
    const res = await axios.post('http://localhost:4000/api/boards', data);
    return res.data;
  }
);


const initialState: BoardState ={
        board:null,
        columns: [],
        loading:false,
        error: null,
    }

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        clearBoard: state => {
            state.board = null;
        },
    },
    extraReducers: builder =>{
        builder.addCase(
            fetchBoardByHash.pending, state => {
                state.loading = true;
            }
        ).addCase(
            fetchBoardByHash.fulfilled, (state, action) =>{
                state.board = action.payload.board;
                state.loading = false;
            }
        ).addCase(
            fetchBoardByHash.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load board';
            }
        ).addCase(createBoard.pending, state => {
                state.loading = true;
            }
        ).addCase(createBoard.fulfilled, (state, action) => {
                state.board = action.payload.board;
                state.columns = action.payload.columns || [];
                state.loading = false;
            }
        ).addCase(createBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create board';
            }
        );
    }
})

export const { clearBoard } = boardSlice.actions;

export default boardSlice.reducer;