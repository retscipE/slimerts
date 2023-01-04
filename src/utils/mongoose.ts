import { model, Schema, Types } from "mongoose";

export interface IUser {
    userId: string
    username: string
    guildId: string
    balance: number
}

export const UserModel = model("user", new Schema<IUser>({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    guildId: { type: String, required: true },
    balance: { type: Number, required: true }
}))