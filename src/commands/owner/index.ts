import { category } from '../../utils'
import forceAddMembers from './forceAddMembers'
import setRank from './setRank'

export default category("Owner", "Commands that only Epicster can use.", [
    forceAddMembers,
    setRank,
])