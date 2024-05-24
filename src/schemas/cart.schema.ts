import mongoose from "mongoose";
const { Schema } = mongoose;

export const cartSchema = new Schema({
  userId: { type: Schema.ObjectId, required: true },
  items: [
    {
      id: { type: Schema.ObjectId, required: true },
      count: { type: Number, required: true, default: 1 },
    },
  ],
});
