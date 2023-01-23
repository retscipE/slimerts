import { SlashCommandBuilder, SlashCommandStringOption, User } from 'discord.js'
import { command, ranks, rankChoices, IRankChoice, IRank, UserModel } from '../../utils'
import ms from 'ms'

const sliced = rankChoices.slice(1)

const meta = new SlashCommandBuilder()
  .setName('setrank')
  .setDescription('Set the rank for a user.')
  .addUserOption((option) =>
    option.setName("target").setDescription("User to give rank.").setRequired(true)
  )
  .addStringOption((option) => {
    option.setName("rank").setDescription("Rank to give.").setRequired(true)
    sliced.forEach((rank) => {
        return option.addChoices(
            {
                name: rank.name,
                value: rank.value
            }
        )
    })
    return option
  })

   
export default command(meta, async ({ interaction }) => {
    const target: User = interaction.options.getUser("target", true);
    const rank: string = interaction.options.getString("rank", true);

    const search = { userId: target.id, guildId: interaction.guild!.id }
    const change = { $set: { rank: rank } }

    if (interaction.user.id === "544646066579046401")  {
        // const user = await UserModel.findOneAndUpdate(search, change)
        interaction.reply({ content: `${rank}` })
    } else {
        return interaction.reply({
          content: "Only Epicster#0001 can use this command!",
          ephemeral: true,
        });
    }
})