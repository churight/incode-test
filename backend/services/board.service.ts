import Board from '../models/board.model';
import Column from '../models/column.model';
import Card from '../models/card.model';

import crypto from 'crypto';

const generateHashId = () => crypto.randomBytes(4).toString('hex');

export const createBoard = async (name: string) => {
  const board = await Board.create({
    name,
    hashId: generateHashId()
  });

  await Column.insertMany([
    { boardId: board._id, type: 'todo', order: 1 },
    { boardId: board._id, type: 'inProgress', order: 2 },
    { boardId: board._id, type: 'done', order: 3 }
  ]);

  return board;
};

export const getBoardByHash = async (hashId: string) => {
  const board = await Board.findOne({ hashId });
  if (!board) throw new Error('Board not found');

  const columns = await Column.find({ boardId: board._id }).sort('order');
  const cards = await Card.find({ boardId: board._id }).sort('position');

  return {
    board,
    columns,
    cards
  };
};

export const getAllBoards = async () =>{
  const boards = await Board.find();
  if(!boards) throw new Error("No boards found");

  return{
    boards
  }
}

export const updateBoard = async (id: string, data: { name?: string }) => {
  const board = await Board.findByIdAndUpdate(id, data, { new: true });
  if (!board) throw new Error('Board not found');

  return board;
};

export const deleteBoard = async (id: string) => {
  await Column.deleteMany({ boardId: id });
  await Card.deleteMany({ boardId: id });
  await Board.findByIdAndDelete(id);
};
