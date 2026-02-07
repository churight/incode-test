import { Router } from 'express';
import {
  createBoard,
  getBoardByHash,
  updateBoard,
  deleteBoard,
  getAllBoards
} from '../controllers/board.controller';
import { validate } from '../middlewares/validate.middleware';
import { createBoardSchema, updateBoardSchema } from '../middlewares/board.validation';

const router = Router();

router.post('/', validate(createBoardSchema), createBoard);

router.get('/:hashId', getBoardByHash);

router.put('/:id', validate(updateBoardSchema), updateBoard);

router.delete('/:id', deleteBoard);

router.get('/', getAllBoards)

export default router;
