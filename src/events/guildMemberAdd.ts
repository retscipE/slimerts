import { event, UserModel } from '../utils'

export default event('guildMemberAdd', ({ log }, member) => {
    (async () => {
        const newUser = new UserModel(
            {
                userId: member.user.id,
                guildId: member.guild.id,
                username: member.user.username,
                balance: 0
            }
        )
        await newUser.save()
    })();
})