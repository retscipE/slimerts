import { category } from '../../utils'

import ping from './ping'

// TODO: Comments on Debug commands
export default category('Debug', "Used to debug the bot to check certain stats.", [
  ping,
])