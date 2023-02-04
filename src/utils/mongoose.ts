import { model, Schema, SchemaType, connect, set, AnyObject, Document } from "mongoose";

export function startConnection(uri: string) {
    // Connect to the mongoose database and catch for errors
  connect(uri).catch((err) => console.error(err))
  set('strictQuery', true)
}

// Create interface to define the variable types in the model
export interface IUser {
    userId: string
    username: string
    guildId: string
    balance: number
    rank: string
}

// Create a model to use for mongoose
export const UserModel = model("user", new Schema<IUser>({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    guildId: { type: String, required: true },
    balance: { type: Number, required: true },
    rank: { type: String, required: true }
}))