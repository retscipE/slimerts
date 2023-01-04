import { event, UserModel } from '../utils'

export default event('guildMemberRemove', ({ log }, member) => {
    (async () => {
        await UserModel.findOneAndDelete({ 
            userId: member.user.id,
            guildId: member.guild.id
        })
    })();
})