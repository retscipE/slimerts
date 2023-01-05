import { ClientEvents, Awaitable, Client } from 'discord.js';
import { type } from 'os';

// Create Type for Logger
type LoggerFunction = (...args: unknown[]) => void

// Export types to define events
export interface EventProps {
    client: Client
    log: LoggerFunction
}

export type EventKeys = keyof ClientEvents
export type EventExec<T extends EventKeys> =
    (props: EventProps, ...args: ClientEvents[T]) => Awaitable<void>
export interface Event<T extends EventKeys> {
    id: T
    exec: EventExec<T>
}
