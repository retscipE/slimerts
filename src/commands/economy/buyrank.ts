import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, User } from 'discord.js'
import { command, event, ranks, UserModel } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('buyrank')
  .setDescription('Returns an embed to allow you to purchase a rank within the bot.')

const buyrank = command(meta, ({ interaction, client }) => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Slimer.TS Ranks` })
        .setColor("DarkBlue")
        .setDescription("Select an option in the select menu to purchase a rank if you have enough coins.")

    const menu = new StringSelectMenuBuilder()
        .setCustomId("buyrank_select_menu")
        .setPlaceholder("No Rank Selected")
        .setMaxValues(1)
        .setMinValues(1);

    const slicedRanks = ranks.slice(1)

    slicedRanks.forEach((rank) => {
        menu.addOptions([
            {
                label: rank.name,
                value: `${rank.id}_option`,
                description: `${rank.name} costs ${rank.coinsNeeded} to purchase.`
            }
        ])
        embed.addFields(
            { name: `${rank.name}`, value: `${rank.coinsNeeded} coins`, inline: true }
        )
    })

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
          menu
        )
    
    interaction.reply({ components: [row], embeds: [embed] })
})

const buyRankEvent = event(
    "interactionCreate",
    async ({ log, client }, interaction) => {
        const search = { userId: interaction.user.id, guildId: interaction.guild?.id }

        const user = await UserModel.findOne(search)

        if (!interaction.isStringSelectMenu()) return;
        if (!(interaction.customId === "buyrank_select_menu")) return;

        const embed = new EmbedBuilder()

        ranks.forEach(async (rank) => {
            if (interaction.values[0] === `${rank.id}_option`) {
                if (user!.balance >= rank.coinsNeeded) {
                    embed
                        .setColor("Green")
                        .setDescription(`Successfully bought ${rank.name} and now you have ${user!.balance - rank.coinsNeeded} coins!`)

                    await UserModel.findOneAndUpdate(search, {
                        $set: {
                            balance: (user!.balance - rank.coinsNeeded),
                            rank: rank.name 
                        }
                    })
                } else {
                    embed
                        .setColor("Red")
                        .setDescription(`You do not have enough coins to purchase this rank! ${rank.coinsNeeded - user!.balance} more coins needed.`)
                }
            }
        })

        await interaction.reply({ embeds: [embed] })
    }
)

export { buyRankEvent, buyrank }