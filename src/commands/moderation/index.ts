import { category } from '../../utils'
import ban from './ban'
import kick from './kick'
import unban from './unban'

// TODO: Comments in moderation commands
export default category("Moderation", "Commands that would be used to punish a user", [
    ban,
    kick,
    unban,
])