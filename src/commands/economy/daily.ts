import { SlashCommandBuilder } from 'discord.js'
import { command, UserModel } from '../../utils'
import ms from 'ms'

function random(min: number, max: number): number {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const meta = new SlashCommandBuilder()
  .setName('daily')
  .setDescription('Redeem your daily reward of coins.')

export default command(meta, async ({ interaction }) => {
    try {
        const randomNumber = random(100, 500)

        const filter = { userId: interaction.user.id, guildId: interaction.guild!.id }
        const user = await UserModel.findOne(filter)
        const update = {
            $set: {
                balance: (user!.balance + randomNumber)
            }
        }

        await UserModel.findOneAndUpdate(filter, update).exec()

        return interaction.reply({ content: `Successfully redeemed your daily reward! Heres ${randomNumber} coins!` })
    } catch (err) { console.log(err) }
}, ms("1 day"))