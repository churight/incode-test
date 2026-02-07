export type Card = {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  position: number;
};

export type CardState = {
  items: Card[];
};
