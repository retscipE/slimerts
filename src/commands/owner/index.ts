import { category } from '../../utils'
import forceAddMembers from './forceAddMembers'
import setRank from './setRank'
import setCoins from './setCoins'

export default category("Owner", "Commands that only Epicster can use.", [
    forceAddMembers,
    setRank,
    setCoins,
])