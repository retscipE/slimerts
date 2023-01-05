import {
    InteractionEditReplyOptions,
    InteractionReplyOptions,
  } from 'discord.js'
  
  export const Colors = {
    error: 0xf54242,
  }
  
  // Create Reply functions for errors that may come up at a later date
  export const Reply = {
    error(msg: string): InteractionReplyOptions {
      return {
        ephemeral: true,
        embeds: [{
          color: Colors.error,
          description: msg
        }]
      }
    }
  }
  
  export const EditReply = {
    error(msg: string): InteractionEditReplyOptions {
      return {
        embeds: [{
          color: Colors.error,
          description: msg
        }]
      }
    }
  }