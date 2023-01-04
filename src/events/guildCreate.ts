import { event, UserModel } from '../utils'

export default event('guildCreate', ({ log }, guild) => {
    guild.members.cache.forEach(async (member) => {
        const newUser = new UserModel(
            {
                userId: member.user.id,
                guildId: guild.id,
                username: member.user.username,
                balance: 0
            }
        )

        await newUser.save()
    })
})