import { event, UserModel } from '../utils'

// Event fires when a member joins a guild and registers their data into the database
// for that guild
export default event('guildMemberAdd', ({ log }, member) => {
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
    newUser.save()
})