import { model, Schema } from "mongoose";

export const BoardSchema = new Schema({
  hashId: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

const Board = model('Board', BoardSchema);
export default Board;