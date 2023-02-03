import { category } from '../../utils'
import balance from './balance'
import daily from './daily'
import profile from './profile'
import coinflip from './coinflip'
import work from './work'
import beg from './beg'
import { buyrank } from './buyrank'

// TODO: Comments on Economy commands
export default category("Economy", "Commands to have fun in a server", [
    balance,
    daily,
    profile,
    coinflip,
    work,
    beg,
    buyrank,
])