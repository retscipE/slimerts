import { Event, EventExec, EventKeys } from '../types'
import SlimerClient from '../client/SlimerClient'

export function event<T extends EventKeys>(id: T, exec: EventExec<T>): Event<T> {
  return {
    id,
    exec,
  }
}

// Use a function to register events into the bot
export function registerEvents(client: SlimerClient, events: Event<any>[]): void {
  for (const event of events)
    client.on(event.id, event.exec.bind(null, {
      client,
      log: (...args) =>
        console.log(`[${event.id}]`, ...args) 
    }))
}