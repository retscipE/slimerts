import { event, startConnection } from '../utils'
import keys from '../keys'

// Create 'ready' event for when bot turns online
export default event('ready', ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`)
  startConnection(keys.mongoDBUri);
})