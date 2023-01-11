import { Client, ClientOptions, Collection } from 'discord.js'

export default class SlimerClient extends Client {
    constructor(options: ClientOptions) { super(options) }

    public cooldown = new Collection<string, number>()
}