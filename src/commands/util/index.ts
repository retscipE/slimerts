import { category } from '../../utils'
import botinfo from './botinfo'
import forceAddMembers from './forceAddMembers'
import role from './role'

// TODO: Comments on Utility commands
export default category('Utility', [
  botinfo,
  role,
  forceAddMembers,
])