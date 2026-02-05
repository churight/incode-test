import { Router } from 'express';
import {
  createBoard,
  getBoardByHash,
  updateBoard,
  deleteBoard
} from '../controllers/board.controller';
import { validate } from '../middlewares/validate.middleware';
import { createBoardSchema, updateBoardSchema } from '../middlewares/board.validation';

const router = Router();

router.post('/', validate(createBoardSchema), createBoard);

router.get('/:hashId', getBoardByHash);

router.put('/:id', validate(updateBoardSchema), updateBoard);

router.delete('/:id', deleteBoard);

export default router;
