import { SlashCommandBuilder, User } from 'discord.js'
import { command, UserModel } from '../../utils'
import ms from 'ms'

const choices = [
  {
    name: "Heads",
    value: "option_heads"
  },
  {
    name: "Tails",
    value: "option_tails"
  }
]

const meta = new SlashCommandBuilder()
  .setName('coinflip')
  .setDescription('Coinflip your money away and possibly get more!')
  .addNumberOption(option => 
    option.setName("coins").setMaxValue(5000).setMinValue(50).setDescription("The amount of money to gamble.").setRequired(true)
  )
  .addStringOption(option => 
    option.setName("choice").setDescription("Heads or Tails").setRequired(true)
    .addChoices(
      { name: "Heads", value: "option_heads" },
      { name: "Tails", value: "option_tails" }
    )
  )

export default command(meta, async ({ interaction }) => {
  const coinsToGamble = interaction.options.getNumber("coins", true)
  const choiceOption = interaction.options.getString("choice", true)

  await interaction.deferReply()
  
  const search = { userId: interaction.user.id, guildId: interaction.guild!.id }
  const user = await UserModel.findOne(search)
  if (coinsToGamble > user!.balance) {
    interaction.editReply({ content: "You do not have that many coins!" })
  }

  const choice = choices.find(e => e.value === choiceOption)!.name
  
  const aiChoices = ["Heads", "Tails"]
  const aiChoice = aiChoices[Math.floor(Math.random() * aiChoices.length)];

  if (choice === aiChoice) {
    await UserModel.findOneAndUpdate(search, { $set: { balance: (user!.balance + coinsToGamble) } })
    interaction.editReply({ content: `You won! ${coinsToGamble} has been added to your balance!` })
  } else if (choice !== aiChoice) {
    await UserModel.findOneAndUpdate(search, { $set: { balance: (user!.balance - coinsToGamble) } })
    interaction.editReply({ content: `You lost. ${coinsToGamble} has been removed from your balance.` })
  }

}, ms("10 seconds"))