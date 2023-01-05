import { event } from '../utils'
import mongoose from 'mongoose'
import keys from '../keys'

// Create 'ready' event for when bot turns online
export default event('ready', ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`)

  // Connect to the mongoose database and catch for errors
  mongoose.connect(keys.mongoDBUri).catch((err) => console.error(err))
  mongoose.set('strictQuery', true)
})