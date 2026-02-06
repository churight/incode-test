import type { Column } from "./column";

export type Board ={
    _id: string;
    hashId: string;
    name: string;
}

export type BoardState = {
    board: null | {
    _id: string;
    name: string;
    hashId: string;
  };
  columns: Column[];
  loading: boolean;
  error: string | null;
}