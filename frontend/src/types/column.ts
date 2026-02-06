export type Column ={
    _id: string;
    boardId: string;
    type: 'todo' | 'inProgress' | 'done';
    order: number;
}

export type ColumnState ={
    items: Column[];
    loading?: boolean;
    error?: string | null;
}