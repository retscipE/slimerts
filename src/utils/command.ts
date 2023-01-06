import {
    Command,
    CommandCategory,
    CommandExec,
    CommandMeta,
    CommandCategoryExtra
  } from '../types'
  
  // Create a function that takes the meta data and the execution and merges into a command
  export function command(meta: CommandMeta, exec: CommandExec): Command {
    return {
      meta,
      exec,
    }
  }
  
  // Create function to assign commands into a category
  export function category(name: string, description: string, commands: Command[]): CommandCategory {
    return {
      name,
      commands,
      description
    }
  }