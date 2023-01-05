import { event, UserModel } from '../utils'

// Event fires when a member leaves or gets kicked from a guild and deletes their document in the database
// for that guild
export default event('guildMemberRemove', ({ log }, member) => {
    (async () => {
        await UserModel.findOneAndDelete({ 
            userId: member.user.id,
            guildId: member.guild.id
        })
    })();
})