import { RoleResolvable, TextChannel } from 'discord.js';
import keys from '../keys';
import { event, UserModel } from '../utils'

// Event fires when a member joins a guild and registers their data into the database
// for that guild
export default event('guildMemberAdd', async ({ log, client }, member) => {
    if (member.user.bot) {
        return;
    }
    
    const newUser = new UserModel(
        {
            userId: member.user.id,
            guildId: member.guild.id,
            username: member.user.username,
            balance: 0
        }
    )
    await newUser.save()

    if (member.guild.id === "1062791278095511633") {
        await member.roles.add("1062793368591155200")

        const channel = client.channels.cache.get("1062795863480615082")! as TextChannel

        channel.send({ content: `<@${member.user.id}> welcome to **${member.guild.name}**!` })
    }
})