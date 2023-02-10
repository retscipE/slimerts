import { model, Schema, SchemaType, connect, set, AnyObject, Document } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

export function startConnection(uri: string) {
    // Connect to the mongoose database and catch for errors
  connect(uri).catch((err) => console.error(err))
  set('strictQuery', true)
}

class Item {
    @prop({ required: true })
    public itemName!: string;

    @prop({ required: true })
    public itemId!: string;
}

class User {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public guildId!: string;

    @prop({ required: true })
    public balance!: number;

    @prop({ required: true })
    public rank!: string;

    @prop({ required: true, type: () => [Item] })
    public items!: Item[]
}

export const UserModel = getModelForClass(User)