import { getRandomColor } from "#bot/lib/random_color";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("usage")
    .setDescription("Shows how to use and set up Issue Mirror");

async function execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
        .setTimestamp()
        .setTitle("Issue Mirror Setup Guide")
        .setDescription("A step-by-step guide to setting up Issue Mirror with GitHub webhooks.")
        .setColor(getRandomColor());

    embed.addFields({
        name: "Step 1: Set Up GitHub Webhook",
        value: `1. Navigate to your GitHub repository's **Settings** > **Webhooks**.\n2. Click **Add webhook** and paste ${process.env.URL}/github-webhook URL on \`Payload URL\`.\n3. Set **Content type** to **application/json** and choose the events **Issues**, **Issue comments** and **Sub issues**.`,
        inline: false
    });

    embed.addFields({
        name: "Step 3: Configure Issue Mirror Bot",
        value: "1. Use the `/watch` command to start mirroring issues from your GitHub repository to the specified Discord channel.\nExample: `/watch your-repo-name your-channel-id`",
        inline: false
    });

    await interaction.reply({ embeds: [embed] });
}


const usage = { data, execute };

export default usage;