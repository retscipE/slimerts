import commands from '../commands'
import { Command } from '../types'
import { EditReply, event, Reply } from '../utils'
import { Collection } from 'discord.js'
import ms from 'ms'

// Maps the commands into a simple to use array
const allCommands = commands.map(({ commands }) => commands).flat()
const allCommandsMap = new Map<string, Command>(
  allCommands.map((c) => [c.meta.name, c])
)

// Create an event that runs when a slash command is detected by the client
export default event('interactionCreate', async (
  {
    log,
    client,
  },
  interaction,
) => {
    const Timeout = new Collection<string, number>();

    if (!interaction.isChatInputCommand()) return;

    try {
        const cmdName = interaction.commandName;
        const command = allCommandsMap.get(cmdName);

        if (!command) throw new Error('Command not found.')
        if (command.cooldown) {
            if (Timeout.has(command.meta.name + "_" + interaction.user.id)) {
                interaction.reply({ content: `You are a on a cooldown that lasts for \`${ms(Timeout.get(command.meta.name + "_" + interaction.user.id)! - Date.now(), { long: true })}\`` })
                return;
            }
            await command.exec({ client, interaction, log(...args) {
                log(`[${command.meta.name}]`, ...args)
            } })
            Timeout.set(command.meta.name + "_" + interaction.user.id, Date.now() + parseInt(command.cooldown.toString()))
            setTimeout(() => {
                Timeout.delete(command.meta.name + "_" + interaction.user.id)
            }, parseInt(command.cooldown.toString()))
        }

        await command.exec({
            client,
            interaction,
            log(...args) {
                log(`[${command.meta.name}]`, ...args)
            },
        })
    } catch (error) {
        log('[Command Error] ', error)

        if (interaction.deferred) {
            interaction.editReply(
                EditReply.error('Something went wrong :(')
            )
        }

        interaction.reply(
            Reply.error("Something went wrong :(")
        )
    }
})