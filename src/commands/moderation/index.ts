import { category } from '../../utils'
import ban from './ban'
import kick from './kick'

// TODO: Comments in moderation commands
export default category("moderation", [
    ban,
    kick,
])