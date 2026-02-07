import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCard = createAsyncThunk(
  "cards/create",
  async (data: {
    boardId: string;
    columnId: string;
    title: string;
    description?: string;
  }) => {
    const res = await axios.post("http://localhost:4000/api/card", data);
    return res.data;
  },
);

export const updateCard = createAsyncThunk(
  "cards/update",
  async (data: { id: string; title: string; description?: string }) => {
    const res = await axios.put(
      `http://localhost:4000/api/card/${data.id}`,
      data,
    );
    return res.data;
  },
);

export const deleteCard = createAsyncThunk(
  "cards/delete",
  async (id: string) => {
    await axios.delete(`http://localhost:4000/api/card/${id}`);
    return id;
  },
);

export const moveCard = createAsyncThunk(
  "cards/move",
  async (data: { cardId: string; columnId: string; position: number }) => {
    const res = await axios.patch(
      `http://localhost:4000/api/card/${data.cardId}/move`,
      {
        columnId: data.columnId,
        position: data.position,
      },
    );
    return res.data;
  },
);
