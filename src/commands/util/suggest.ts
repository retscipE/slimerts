import { EmbedBuilder, EmojiIdentifierResolvable, SlashCommandBuilder, TextChannel } from 'discord.js'
import { command } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('suggest')
  .setDescription('Suggest things to be added to the bot.')
  .addStringOption(option => 
    option.setName("suggestion").setDescription("Feature to suggest to the bot.").setRequired(true)  
  )

export default command(meta, async ({ interaction, client }) => {
    const suggestion = interaction.options.getString("suggestion", true)
    const channel = client.guilds.cache.get(client.supportGuildId)!.channels.cache.get("1068595863980609617") as TextChannel

    const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(client.user!.displayAvatarURL())
        .addFields(
            { name: "Suggestion", value: `${suggestion}`, inline: true }
        )
    
    await interaction.reply({ content: "Your suggestion has been sent successfully.", ephemeral: true })

    const msg = await channel.send({ embeds: [embed] })
    await msg.react("👍")
    await msg.react("👎")
}, ms("30 minutes"))