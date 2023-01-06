import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("unban")
  .setDescription("Unban a user from a guild.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((option) =>
    option.setName("target").setDescription("The user to unban").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("Reason for unban").setRequired(false)
  );

export default command(meta, ({ interaction }) => {
    const targetUser = interaction.options.getUser("target", true)
    const reason = interaction.options.getString("reason", false) ?? "No reason provided"

    interaction.guild!.members.unban(targetUser, reason)
        .then((user) => interaction.reply(`**${user!.tag}** is now unbanned!`))
        .catch((err) => interaction.reply("This user isn't banned!"))
});
