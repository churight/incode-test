import { model, Schema } from "mongoose";

export const ColumnSchema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  type: {
    type: String,
    enum: ["todo", "inProgress", "done"],
    required: true,
  },
  order: { type: Number, required: true },
});

const Column = model("Column", ColumnSchema);
export default Column;
