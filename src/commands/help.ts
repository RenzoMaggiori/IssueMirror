import { createEmbed } from "#bot/lib/create_embed";
import { getRandomColor } from "#bot/lib/random_color";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show help for commands")
    .addStringOption((option) =>
        option.setName("command").setDescription("Name of the command to get help for").setRequired(false)
    );

const commandsUsage = [
    {
        name: "watch",
        usage: "\`/watch <repo_name> <channel_id>\`",
        description: "Add a GitHub repository to watch.",
        options: [
            { name: "repo", description: "The name of the repository." },
            { name: "channel_id", description: "The channel ID where issues will be mirrored." },
        ],
        example: "\`/watch repo: JohnDoe/ToDoApp channel_id: 1135851902983225388\`"
    },
    {
        name: "unwatch",
        usage: "\`/unwatch <repo_name>\`",
        description: "Stop watching a GitHub repository.",
        options: [
            { name: "repo", description: "The name of the repository." }
        ],
        example: "\`/unwatch repo: JohnDoe/ToDoApp\`"
    },
    {
        name: "list-repos",
        usage: "\`/list-repos\`",
        description: "List all watched repositories for this server.",
        example: "\`/list-repos\`"
    },
    {
        name: "usage",
        usage: "\`/usage\`",
        description: "A step-by-step guide to setting up Issue Mirror with GitHub webhooks.",
        example: "\`/usage\`"
    },
];

async function execute(interaction: ChatInputCommandInteraction) {
    const commandName = interaction.options.getString("command");

    if (!commandName) {
        const embed = createEmbed({
            timestamp: undefined,
            color: getRandomColor(),
            title: "Available Commands",
            description: "For more detailed help on a command use: `/help [command]`",
            footer: {text: "Syntax: <required> [optional]"}
        })

        const commandList = commandsUsage.map((c) => `- **${c.name}** - ${c.description}`).join("\n");
        embed.addFields({
            name: "Commands",
            value: commandList
        });

        await interaction.reply({ embeds: [embed] });
        return;
    }
    const command = commandsUsage.find((cmd) => cmd.name === commandName);
    if (!command) {
        await interaction.reply(`Command /${commandName} not found.`);
        return;
    }

    const embed = createEmbed({
        timestamp: undefined,
        color: getRandomColor(),
        title: `Command ${commandName}`,
        description: command.description,
        footer: { text: "Syntax: <required> [optional]" },
        fields: [{ name: "Usage", value: command.usage }]
    });

    if (command.options) {
        const params = command.options.map((o) => `- **${o.name}**: ${o.description}`).join("\n");
        embed.addFields({ name: "Parameters", value: params });
    }
    embed.addFields({ name: "Example", value: command.example! });

    await interaction.reply({ embeds: [embed] });
}

const help = { data, execute };

export default help;
