import { category } from '../../utils'
import balance from './balance'
import daily from './daily'

// TODO: Comments on Economy commands
export default category("Economy", "Commands to have fun in a server", [
    balance,
    daily
])