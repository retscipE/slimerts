import { category } from '../../utils'
import ban from './ban'
import kick from './kick'
import unban from './unban'

// TODO: Comments in moderation commands
export default category("Moderation", "Used for punishing and moderating your server.",  [
    ban,
    kick,
    unban,
])