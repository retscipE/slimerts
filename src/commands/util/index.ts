import { category } from '../../utils'
import botinfo from './botinfo'
import forceAddMembers from './forceAddMembers'
import role from './role'

export default category('Utility', [
  botinfo,
  role,
  forceAddMembers,
])