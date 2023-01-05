import {
  Awaitable,
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'

// Logger function again...
type LoggerFunction = (...args: unknown[]) => void

// Export types to build commands
export interface CommandProps {
  interaction: ChatInputCommandInteraction
  client: Client
  log: LoggerFunction
}

export type CommandExec =
  (props: CommandProps) => Awaitable<unknown>
export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
  | SlashCommandSubcommandsOnlyBuilder
export interface Command {
  meta: CommandMeta
  exec: CommandExec
}

export interface CommandCategoryExtra {
  description?: string
}

export interface CommandCategory extends CommandCategoryExtra {
  name: string
  commands: Command[]
}