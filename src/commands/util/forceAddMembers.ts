import { SlashCommandBuilder } from 'discord.js'
import { command, UserModel } from '../../utils'

const meta = new SlashCommandBuilder()
  .setName('forceaddmembers')
  .setDescription('Force members in guild to be added to the database')

export default command(meta, ({ interaction }) => {
    if (interaction.user.id == "544646066579046401") {
        interaction.guild!.members.cache.forEach(async (member) => {
            if (!member.user.bot) {
                const newUser = new UserModel(
                    {
                        userId: member.user.id,
                        guildId: member.guild.id,
                        username: member.user.username,
                        balance: 0
                    }
                )
    
                await newUser.save()
            }
        })

        interaction.reply({ content: "Successfully forced all members in this guild to be added to the database!", ephemeral: true })
    } else {
        return interaction.reply({ content: "Only Epicster#0001 can use this command!", ephemeral: true })
    }
})