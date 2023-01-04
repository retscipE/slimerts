import { Keys } from '../types'

const keys: Keys = {
    clientToken: process.env.CLIENT_TOKEN ?? 'nil',
    testGuild: process.env.TEST_GUILD ?? 'nil',
    mongoDBUri: process.env.MONGO_DB ?? 'nil'
}

if (Object.values(keys).includes('nul'))
    throw new Error("Not all ENV variables are defined!")

export default keys
