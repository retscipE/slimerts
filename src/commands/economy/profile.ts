import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command, UserModel } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("balance")
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

  

  interaction.reply({ embeds: [] });
});
