import { Router } from "express";

import { validate } from "../middlewares/validate.middleware";
import {
  createCardSchema,
  updateCardSchema,
} from "../middlewares/card.validation";
import {
  createCard,
  deleteCard,
  moveCard,
  updateCard,
} from "../controllers/cards.controller";

const router = Router();
router.post("/", validate(createCardSchema), createCard);
router.put("/:id", validate(updateCardSchema), updateCard);
router.patch("/:id/move", moveCard);
router.delete("/:id", deleteCard);

export default router;
