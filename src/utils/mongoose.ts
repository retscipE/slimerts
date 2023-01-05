import { model, Schema, Types } from "mongoose";

// Create interface to define the variable types in the model
export interface IUser {
    userId: string
    username: string
    guildId: string
    balance: number
}

// Create a model to use for mongoose
export const UserModel = model("user", new Schema<IUser>({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    guildId: { type: String, required: true },
    balance: { type: Number, required: true }
}))