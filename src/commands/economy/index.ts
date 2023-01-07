import { category } from '../../utils'
import balance from './balance'
import daily from './daily'

// TODO: Comments on Economy commands
export default category("Economy", "Economical commands to have some fun",[
    balance,
    daily,
])