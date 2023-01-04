import commands from '../commands'
import { Command } from '../types'
import { EditReply, event, Reply } from '../utils'

const allCommands = commands.map(({ commands }) => commands).flat()
const allCommandsMap = new Map<string, Command>(
  allCommands.map((c) => [c.meta.name, c])
)

export default event('interactionCreate', async (
  {
    log,
    client,
  },
  interaction,
) => {
    if (!interaction.isChatInputCommand()) return;

    try {
        const cmdName = interaction.commandName;
        const command = allCommandsMap.get(cmdName);

        if(!command) throw new Error('Command not found.')

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