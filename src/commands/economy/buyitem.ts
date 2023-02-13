import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, User } from 'discord.js'
import { command, event, itemObjects, UserModel } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('buyitem')
  .setDescription('Returns an embed to allow you to purchase an item within the bot.')

const buyitem = command(meta, async ({ interaction, client }) => {
    const user = await UserModel.findOne({ userId: interaction.user.id, guildId: interaction.guildId }).exec()
    const items = user!.items

    const embed = new EmbedBuilder()
        .setAuthor({ name: `Item Shop` })
        .setColor("DarkBlue")
        .setDescription("Select an option in the select menu to purchase an item if you have enough coins.")

    const menu = new StringSelectMenuBuilder()
        .setCustomId("itemshop_select_menu")
        .setPlaceholder("No Item Selected")
        .setMaxValues(1)
        .setMinValues(1);

    items.forEach((itemm) => {
        const item = itemObjects.filter(item => itemm.itemId === item.id)[0]
        menu.addOptions([
            {
                label: `${item.name}`,
                value: `${item.id}_option`,
                description: `${item.description} | ${item.ability}`
            }
        ])

        embed.addFields(
            { name: `${item.name}`, value: `${item.coinsNeeded}`, inline: true }
        )
    })

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
          menu
        )
    
    interaction.reply({ components: [row], embeds: [embed] })
})

const buyItemEvent = event(
    "interactionCreate",
    async ({ log, client }, interaction) => {
        const search = { userId: interaction.user.id, guildId: interaction.guild!.id }
        const user = await UserModel.findOne(search)
        const items = user!.items

        if (!interaction.isStringSelectMenu()) return;
        if (!(interaction.customId === "buyrank_select_menu")) return;

        const embed = new EmbedBuilder()

        itemObjects.forEach(async (item) => {
            if (interaction.values[0] === `${item.id}_option`) {
                if (user!.balance >= item.coinsNeeded) {
                    embed
                        .setColor("Green")
                        .setDescription(`Successfully bought **${item.name}** and now you have ${user!.balance - item.coinsNeeded} coins!`)

                    try {
                        items.push({ itemId: item.id, itemName: item.name })
                        await user!.save()
                            .then(() => {
                                console.log(items)
                            })
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    embed
                        .setColor("Red")
                        .setDescription(`You do not have enough coins to purchase this item! ${item.coinsNeeded - user!.balance} more coins needed.`)
                }
            }
        })

        // user!.items.push({ itemId: item.id, itemName: item.name })
        // await user!.save()

        await interaction.reply({ embeds: [embed] })
    }
)

export { buyItemEvent, buyitem }