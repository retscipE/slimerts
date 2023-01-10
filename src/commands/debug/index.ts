import { category } from '../../utils'

import ping from './ping'

// TODO: Comments on Debug commands
export default category('Debug', "Debug commands like /ping and others to show certain info", [
  ping,
])