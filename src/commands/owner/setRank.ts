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
    const targetOption: User = interaction.options.getUser("target", true);
    const rankOption = interaction.options.get("rank", true);

    const rank = sliced.find(e => e.value === rankOption.value) as IRankChoice

    const search = { userId: targetOption.id, guildId: interaction.guild!.id }
    const change = { $set: { rank: rank.name } }

    if (interaction.user.id === "544646066579046401")  {
      if (targetOption.bot) {
        interaction.reply({ content: "This user is a bot and cannot receive a rank" })
      } else {
        await UserModel.findOneAndUpdate(search, change)
        await interaction.deferReply({ ephemeral: true })

        interaction.reply({ content: `Successfully gave **${targetOption.username}** the **${rank.name}** rank!` })
      }
    } else {
        return interaction.reply({
          content: "Only Epicster#6593 can use this command!",
          ephemeral: true,
        });
    }
})