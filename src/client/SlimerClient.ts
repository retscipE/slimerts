import { Client, ClientOptions, Collection, Guild } from 'discord.js'

export default class SlimerClient extends Client {
    constructor(options: ClientOptions) { super(options) }

    public cooldown = new Collection<string, number>()

    public supportGuildId = "1062791278095511633"

    public randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}