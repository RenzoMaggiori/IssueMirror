// src/commands/list-repos.ts
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { listRepositories } from "#bot/lib/db";

const data = new SlashCommandBuilder()
    .setName("list-repos")
    .setDescription("List all watched repositories for this server");

async function execute(interaction: CommandInteraction) {
    const repos = await listRepositories(interaction.guildId!);
    if (repos.length === 0) {
        await interaction.reply("This server is not watching any repositories.");
    } else {
        await interaction.reply(`Watched repositories:\n${repos.map((r) => `- ${r.github_repo_name}`).join("\n")}`);
    }
}

const listRepos = { data, execute };

export default listRepos;