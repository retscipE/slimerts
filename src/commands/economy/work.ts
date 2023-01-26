import { SlashCommandBuilder } from 'discord.js'
import { command, UserModel } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('work')
  .setDescription('Work a little bit and get some money.')

export default command(meta, async ({ interaction, client }) => {
  const cash = client.randomInteger(250, 1000)
  const prompts = [
    "worked at McDonalds",
    "mowed your neighbor's lawn", 
    "went on a podcast",
    "made a banger song",
    "got into a MrBeast video",
    "invested into DogeCoin"
  ]
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  const search = { userId: interaction.user.id, guildId: interaction.guild!.id }
  const user = await UserModel.findOne(search)

  interaction.reply({ content: `You ${prompt} and earned ${cash} coins!` })
  await UserModel.findOneAndUpdate(search, { $set: { balance: (user!.balance + cash) } })
}, ms("5 minutes"))