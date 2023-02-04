import { SlashCommandBuilder } from 'discord.js'
import { command, UserModel } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('beg')
  .setDescription('Beg some people for cash and coins')

export default command(meta, async ({ interaction, client }) => {
    const cash = client.randomInteger(50, 500)
    const people = [
      "Andrew Tate",
      "MrBeast",
      "Logan Paul",
      "Jake Paul",
      "Elon Musk",
      "Bill Gates",
      "Phil Swift",
      "Dwayne Johnson",
      "Barack Obama",
      "Joe Biden",
      "Donald Trump",
    ]
    const person = people[Math.floor(Math.random() * people.length)];
  
    const search = { userId: interaction.user.id, guildId: interaction.guild!.id }
    const user = await UserModel.findOne(search)
  
    if (person === "Andrew Tate") {
        interaction.reply({ content: "Andrew Tate spat in your face and told you to get money from his service. Yikes. (no money earned)" })
    } else {
        interaction.reply({ content: `You begged ${person} to give you money and they gave you ${cash} coins!` })
        await UserModel.findOneAndUpdate(search, { $set: { balance: (user!.balance + cash) } })
    }
}, ms("1 minute"))