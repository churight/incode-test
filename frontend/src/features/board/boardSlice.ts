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

export const deleteBoard = createAsyncThunk(
    'board/delete',
    async (id:string) =>{
        await axios.delete(`http://localhost:4000/api/boards/${id}`);
        return id;
    }
);

export const updateBoard = createAsyncThunk(
    'board/update',
    async(data:{
        id:string,
        name:string,
    }) =>{
        const res = await axios.put(`http://localhost:4000/api/boards/${data.id}`, data);
        return res.data
    }
)

export const getAllBoards = createAsyncThunk(
    'board/getAll',
    async()=>{
        const res = await axios.get(`http://localhost:4000/api/boards/`);
        return res.data;
    }
)


const initialState: BoardState ={
    board: null,
    columns: [],
    loading: false,
    error: null,
    boardList: []
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
        ).addCase(getAllBoards.fulfilled, (state, action) => {
                state.boardList = action.payload.boards;
            }
        ).addCase(updateBoard.fulfilled, (state, action) =>{
            const index = state.boardList.findIndex(
                b => b._id === action.payload._id
            );
            if (index!== -1){
                state.boardList[index] = action.payload;
            }

            if(state.board?._id === action.payload._id){
                state.board = action.payload;
            }
        }).addCase(deleteBoard.fulfilled, (state, action) =>{
            state.boardList = state.boardList.filter(
                b=>b._id!==action.payload
            );
            if(state.board?._id === action.payload){
                state.board = null
            }
        });
    }
})

export const { clearBoard } = boardSlice.actions;

export default boardSlice.reducer;