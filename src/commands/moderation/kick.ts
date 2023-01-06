import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kick a user from a guild.")
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption((option) =>
    option.setName("target").setDescription("The user to kick").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("Reason for kick").setRequired(false)
  );

export default command(meta, ({ interaction }) => {
    const targetUser = interaction.options.getUser("target", true)
    const reason = interaction.options.getString("reason", false) ?? "No reason provided"

    const targetToKick = interaction.guild!.members.cache.get(targetUser.id)
    if (targetToKick!.kickable) {
        targetToKick!.kick(reason).then((member) => interaction.reply(
            { content: `Successfully kicked **${member.user.tag}** from **${interaction.guild?.name}** for **${reason}**` }
        ))
        targetToKick!.user.send(`You were kicked from **${interaction.guild!.name}** for **${reason}**`)
          .catch((err) => interaction.reply({ content: "Could not dm user", ephemeral: true }))
    } else {
        interaction.reply(
            { content: "This user is not kickable!", ephemeral: true }
        )
    }
});
