import { Request, Response, NextFunction } from "express";
import * as boardService from "../services/board.service";

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const board = await boardService.createBoard(req.body.name);
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const getBoardByHash = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hashId = req.params.hashId as string;
    const data = await boardService.getBoardByHash(hashId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const data = await boardService.getAllBoards();
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "No Boards founf" });
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const board = await boardService.updateBoard(id, req.body);
    res.json(board);
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    await boardService.deleteBoard(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
