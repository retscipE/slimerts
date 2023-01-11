import { event, UserModel } from '../utils'

// Registers all current members in a guild to the database (could destroy the bot if in big server idk)
export default event('guildCreate', ({ log }, guild) => {
    guild.members.cache.forEach((member) => {
        if (member.user.bot) {
            return;
        }
        
        const newUser = new UserModel(
            {
                userId: member.user.id,
                guildId: guild.id,
                username: member.user.username,
                balance: 0
            }
        )

        newUser.save()
    })
})