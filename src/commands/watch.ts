// src/commands/watch.ts
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addRepository } from "#bot/lib/db";

const data = new SlashCommandBuilder()
  .setName("watch")
  .setDescription("Add a GitHub repository to watch")
  .addStringOption((option) =>
    option.setName("repo").setDescription("The repository name (e.g., owner/repo)").setRequired(true),
  );

async function execute(interaction: ChatInputCommandInteraction) {
  const repoName = interaction.options.getString("repo", true);
  await addRepository(interaction.guildId!, repoName);
  await interaction.reply(`Now watching repository: ${repoName}`);
}

const watch = { data, execute };

export default watch;
