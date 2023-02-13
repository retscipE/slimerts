import { SlashCommandBuilder, SlashCommandStringOption, User } from 'discord.js'
import { command, ranks, rankChoices, IRankChoice, IRank, UserModel } from '../../utils'
import ms from 'ms'

const sliced = rankChoices.slice(1)

const meta = new SlashCommandBuilder()
  .setName('setcoins')
  .setDescription('Set the coins for a user.')
  .addUserOption((option) =>
    option.setName("target").setDescription("User to give rank.").setRequired(true)
  )
  .addNumberOption((option) => 
    option.setName("coins").setDescription("The amount of coins to set the user to").setRequired(true)
  )

   
export default command(meta, async ({ interaction }) => {
    const targetOption: User = interaction.options.getUser("target", true);
    const coinsToGive = interaction.options.getNumber("coins", true)

    const search = { userId: targetOption.id, guildId: interaction.guild!.id }
    const change = { $set: { coins: coinsToGive  } }

    if (targetOption.bot) {
      interaction.reply({ content: "This user is a bot and cannot receive coins." })
    } else {
      await UserModel.findOneAndUpdate(search, change)

      interaction.reply({ content: `Successfully gave **${targetOption.username}** an extra ${coinsToGive} coins.` })
    }
})