import { Event } from '../types'
import ready from './ready'
import interactionCreate from './interactionCreate'
import guildMemberAdd from './guildMemberAdd'
import guildMemberRemove from './guildMemberRemove'
import guildCreate from './guildCreate'
import { helpEvent } from '../commands/util/help'

// Assign the events into an array
const events: Event<any>[] = [
  interactionCreate,
  ready,
  guildMemberAdd,
  guildMemberRemove,
  guildCreate,
  helpEvent
]

export default events