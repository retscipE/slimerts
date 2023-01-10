import { SlashCommandBuilder } from 'discord.js'
import { command, UserModel } from '../../utils'
import ms from 'ms'

function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const meta = new SlashCommandBuilder()
  .setName('daily')
  .setDescription('Get some coins every day.')

export default command(meta, async ({ interaction }) => {
    const user = await UserModel.findOne({ userId: interaction.user.id, guildId: interaction.guild!.id })
    try {
        const dailyAmount = randomNumber(250, 500)
        await user!.updateOne(
            { userId: interaction.user.id, guildId: interaction.guild!.id },
            {
                $set: {
                    balance: user!.balance + dailyAmount
                }
            }
        )
        interaction.reply({ content: `You have gotten ${dailyAmount} coins today! Come back tomorrow to claim more!` })
    } catch (err) { console.log(err) }
}, ms("30s"))