import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { removeRepository } from "#bot/lib/db";

const data = new SlashCommandBuilder()
    .setName("unwatch")
    .setDescription("Remove a GitHub repository from being watched")
    .addStringOption((option) =>
        option.setName("repo").setDescription("The repository name (e.g., owner/repo)").setRequired(true),
    );

async function execute(interaction: ChatInputCommandInteraction) {
    const repoName = interaction.options.getString("repo", true);
    await removeRepository(interaction.guildId!, repoName);
    await interaction.reply(`Stopped watching repository: ${repoName}`);
}

const unwatch = { data, execute };

export default unwatch;