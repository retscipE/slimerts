import { APIInteractionDataResolvedGuildMember, GuildMember, PermissionFlagsBits, Role, RoleManager, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
  .setName('role')
  .setDescription("Give or remove someone's role")
  .addSubcommand((subcommand) => 
    subcommand
        .setName("add")
        .setDescription("Add a role to the user provided")
        .addUserOption(option => option.setName("target").setDescription("User to give role"))
        .addRoleOption(option => option.setName("role").setDescription("Role to give"))
  )
  .addSubcommand((subcommand) => 
    subcommand
        .setName("remove")
        .setDescription("Remove a role from the user provided")
        .addUserOption(option => option.setName("target").setDescription("User to remove role from"))
        .addRoleOption(option => option.setName("role").setDescription("Role to remove"))
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .setDMPermission(false)

export default command(meta, ({ interaction, client }) => {
    let target: GuildMember | undefined;
    let role: Role | undefined;

    switch(interaction.options.getSubcommand()) {
        case "add":
            target = client.guilds.cache.get(interaction.guild!.id)!.members.cache.get(interaction.options.getUser("target")!.id)
            role = client.guilds.cache.get(interaction.guild!.id)!.roles.cache.get(interaction.options.getRole("role")!.id)
            target!.roles.add(role!.id)

            interaction.reply(
                {
                    content: `Successfully added **${role!.name}** to **${target!.user.tag}**`,
                    ephemeral: true
                }
            )
            break;
        case "remove":
            target = client.guilds.cache.get(interaction.guild!.id)!.members.cache.get(interaction.options.getUser("target")!.id)
            role = client.guilds.cache.get(interaction.guild!.id)!.roles.cache.get(interaction.options.getRole("role")!.id)
            target!.roles.remove(role!.id)

            interaction.reply(
                {
                    content: `Successfully removed **${role!.name}** from **${target!.user.tag}**`,
                    ephemeral: true
                }
            )
            break;
    }
})