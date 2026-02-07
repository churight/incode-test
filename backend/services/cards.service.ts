import Card from "../models/card.model";
import Column from "../models/column.model";
import CreateCard from "../intefaces/card.interface";
import { Types } from "mongoose";

export const createCard = async ({
  boardId,
  columnId,
  title,
  description,
}: CreateCard) => {
  const lastCard = await Card.find({ columnId }).sort("-position").limit(1);
  const position = lastCard.length ? lastCard[0].position + 1 : 1;
  return Card.create({ boardId, columnId, title, description, position });
};

export const updateCard = async (id: string, data: Partial<CreateCard>) => {
  const card = await Card.findByIdAndUpdate(id, data, { new: true });
  if (!card) throw new Error("Not found");
  return card;
};

export const DeleteCard = async (id: string) => {
  const card = await Card.findByIdAndDelete(id);
  if (!card) throw new Error("Not found");
  return card;
};

export const MoveCard = async (
  id: string,
  newColumnId: string,
  newPosition: number,
) => {
  const card = await Card.findById(id);
  if (!card) throw new Error("Not found");

  await Card.updateMany(
    { columnId: newColumnId, position: { $gte: newPosition } },
    { $inc: { position: 1 } },
  );

  card.columnId = new Types.ObjectId(newColumnId);
  card.position = newPosition;
  await card.save();

  return card;
};
