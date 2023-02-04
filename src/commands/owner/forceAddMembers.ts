import { SlashCommandBuilder } from "discord.js";
import { command, UserModel } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("forceaddmembers")
  .setDescription("Force members in guild to be added to the database");

export default command(meta, ({ interaction }) => {
  interaction.guild!.members.cache.forEach(async (member) => {
    if (!member.user.bot) {
      const newUser = new UserModel({
        userId: member.user.id,
        guildId: member.guild.id,
        username: member.user.username,
        balance: 0,
        rank: "Default"
      });

      await newUser.save();
    }
  });

  interaction.reply({
    content:
      "Successfully forced all members in this guild to be added to the database!",
    ephemeral: true,
  });
});
