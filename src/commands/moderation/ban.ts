import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Ban a user from a guild.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((option) =>
    option.setName("target").setDescription("The user to ban").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("Reason for ban").setRequired(false)
  );

export default command(meta, ({ interaction }) => {
    const targetUser = interaction.options.getUser("target", true)
    const reason = interaction.options.getString("reason", false) ?? "No reason provided"

    const targetToBan = interaction.guild!.members.cache.get(targetUser.id)
    if (targetToBan!.bannable) {
        targetToBan!.ban({ reason: reason }).then((member) => interaction.reply(
            { content: `Successfully banned **${member.user.tag}** from **${interaction.guild!.name}** for **${reason}**` }
        ))
        targetToBan!.user.send(`You were banned from **${interaction.guild!.name}** for **${reason}**`)
          .catch((err) => {})
    } else {
        interaction.reply(
            { content: "This user is not bannable!", ephemeral: true }
        )
    }
});
