import { event, UserModel } from '../utils'

// Registers all current members in a guild to the database (could destroy the bot if in big server idk)
export default event('guildCreate', ({ log }, guild) => {
    guild.members.fetch()
        .then(members => {
            members.forEach(async member => {
                if (member.user.bot) {
                    return;
                }

                const newUser = await UserModel.create(
                    {
                        userId: member.user.id,
                        guildId: guild.id,
                        username: member.user.username,
                        balance: 0,
                        rank: "Default",
                        items: []
                    }
                )
        
                newUser.save()
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
        .catch(err => {
            console.log(err)
        })
})