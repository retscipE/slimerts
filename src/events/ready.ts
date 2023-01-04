import { event } from '../utils'
import mongoose from 'mongoose'
import keys from '../keys'

export default event('ready', ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`)

  mongoose.connect(keys.mongoDBUri).catch((err) => console.error(err))
  mongoose.set('strictQuery', false)
})