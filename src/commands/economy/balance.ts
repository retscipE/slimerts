import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command, UserModel, IUser } from '../../utils'
import { Document } from 'mongoose'

const meta = new SlashCommandBuilder()
  .setName('balance')
  .setDescription("Get your balance or another user's balance")
  .addUserOption((options) => 
    options
      .setName("user")
      .setDescription("User to get the balance of")
      .setRequired(false)
  )

export default command(meta, async ({ interaction }) => {
  const user = interaction.options.getUser("user") ?? interaction.user
  const userData = await UserModel.findOne({
    userId: user.id,
    guildId: interaction.guild!.id
  })

  const embed = new EmbedBuilder()
    .setAuthor({ name: `${user.tag} in ${interaction.guild!.name}`, iconURL: user.displayAvatarURL() })
    .setColor("Navy")
    .addFields(
      { name: "Balance", value: `${userData!.balance} coins`, inline: true },
      { name: "User ID", value: `${user.id}`, inline: true }
    )

  interaction.reply({ embeds: [embed] })
  
})