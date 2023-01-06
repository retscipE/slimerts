import { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js'
import { command, event } from '../../utils'
import { CommandCategory, Command } from '../../types'

import categories from '../../commands'

import { setTimeout as wait } from 'timers/promises'

const meta = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Show all the commands within the bot')

const help = command(meta, ({ interaction }) => {
  const embed = new EmbedBuilder()
    .setColor("Navy")
    .setAuthor({ name: "Slimer.TS Help Menu", iconURL: interaction.client.user.displayAvatarURL() })

  const menu = new StringSelectMenuBuilder()
    .setCustomId("help_select_menu")
    .setPlaceholder("No menu selected")
    .setMaxValues(1)
    .setMinValues(1)

  categories.forEach((category) => {
    menu.addOptions([
      {
        label: category.name,
        description: category.description ?? "No description provided",
        value: `${category.name}_option`
      }
    ])
  })
  
  const row = new ActionRowBuilder()
    .addComponents(
      menu
    )
})

const helpEvent = event('interactionCreate', async ({ log, client }, interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (!(interaction.customId === "help_select_menu")) return;


})

export { help, helpEvent }