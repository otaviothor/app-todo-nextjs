import mongoose, { model, models, Schema } from "mongoose";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((error) => console.log(error));

  console.log("Mongoose connection established");

  const TodoSchema = new Schema({
    item: String,
    completed: Boolean,
  });

  const Todo = models.Todo || model("Todo", TodoSchema);

  return { conn, Todo };
};
