import { Pagination } from '@acegoal07/discordjs-pagination'
import { Embed, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command, UserModel, itemObjects, chunk } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('inventory')
  .setDescription('Display your own inventory')

export default command(meta, async ({ interaction, client }) => {
    const user = await UserModel.findOne({ userId: interaction.user.id, guildId: interaction.guildId }).exec()
    const items = user!.items

    const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s inventory`)
        .setColor("Navy")

    if (items.length < 1) {
        embed.setDescription("No Items.")

        interaction.reply({ embeds: [embed] })
    } else if (items.length > 1 && items.length < 5) {
        items.forEach(itemA => {
            const item = itemObjects.filter(item => itemA.itemId === item.id)[0]
            embed.addFields(
                { name: `${item.name}`, value: `${item.description}\n${item.ability}`, inline: true }
            )
        })

        interaction.reply({ embeds: [embed] })
    } else if (items.length > 5) {
        const chunks = chunk(items, 5)
        
        const embedsArray: EmbedBuilder[] = []

        chunks.forEach(chunk => {
            const newEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.username}'s inventory`)
                .setColor("Navy")
            chunk.forEach(itemA => {
                const item = itemObjects.filter(item => itemA.itemId === item.id)[0]
                newEmbed.addFields(
                    {
                        name: `${item.name}`,
                        value: `${item.description} | ${item.ability}`,
                        inline: true
                    }
                )
            })
            embedsArray.push(newEmbed)
        })

        
    
    }

}, ms("10 seconds"), true)