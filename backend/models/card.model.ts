import { model, Schema } from "mongoose";

export const CardSchema = new Schema({
  boardId:{type: Schema.Types.ObjectId, ref: 'Board', required: true},
  columnId: {type: Schema.Types.ObjectId, ref: 'Co;umn', required: true},
  title: {type: String, required: true},
  description: String,
  position: {type: Number, required:true}
});

const Card = model('Card', CardSchema);
export default Card;