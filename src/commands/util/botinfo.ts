import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { command } from "../../utils";
import categories from '../../commands'

const meta = new SlashCommandBuilder()
  .setName("botinfo")
  .setDescription("Get information on the bot.");

export default command(meta, ({ interaction }) => {
  let amountOfCommands = 0;

  categories.forEach((category) => {
    amountOfCommands = amountOfCommands + category.commands.length;
  })

  const embed = new EmbedBuilder()
    .addFields(
      { name: "Bot Creator", value: "Epicster#0001", inline: true },
      { name: "Language Used", value: "NodeJS w/ Typescript", inline: true },
      { name: "Discord.JS Version", value: "v14.7.1", inline: true },
      { name: "Websocket Ping", value: `${interaction.client.ws.ping}ms`, inline: true },
      { name: "Date Created", value: "January 3rd, 2023", inline: true },
      { name: "Bot User ID", value: "1059870227988500601", inline: true },
      { name: "# of Commands", value: `${amountOfCommands}`, inline: true }
    )
    .setColor(Colors.Navy)
    .setAuthor({
      name: `${interaction.client.user.tag}`,
      iconURL: interaction.client.user.displayAvatarURL(),
    })
    .setFooter({
      text: "Created by Epicster#6593",
      iconURL:
        interaction.client.users.cache
          .get("544646066579046401")
          ?.displayAvatarURL() ?? interaction.client.user.displayAvatarURL(),
    });

  interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
});
