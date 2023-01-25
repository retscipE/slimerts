import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command, UserModel } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("profile")
  .setDescription("Get either yours or another person's profile.")
  .addUserOption((options) =>
    options
      .setName("user")
      .setDescription("User to get the profile of")
      .setRequired(false)
  );

export default command(meta, async ({ interaction }) => {
  const user = interaction.options.getUser("user") ?? interaction.user;
  const userData = await UserModel.findOne({
    userId: user.id,
    guildId: interaction.guild!.id,
  });

  const embed = new EmbedBuilder()
    .setAuthor({ name: `${user.username}'s Profile in ${interaction.guild!.name}` })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Rank", value: `${userData!.rank}`, inline: true },
      { name: "Balance", value: `${userData!.balance} coins`, inline: true },
      { name: "User ID", value: `${user.id}`, inline: true },
    )
    .setColor("DarkNavy")

  interaction.reply({ embeds: [embed] });
});
