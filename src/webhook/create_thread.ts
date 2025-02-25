import { ChannelType, Client, EmbedBuilder, ThreadChannel } from "discord.js";

import { GitHubIssuePayload } from "#bot/lib/types";
import { getRandomColor } from "#bot/lib/random_color";

async function PinEmbedMessage(thread: ThreadChannel) {
    const messages = await thread.messages.fetch({ limit: 1 });
    const firstMessage = messages.first();

    if (firstMessage) await firstMessage.pin();
}

function createEmbed(issue: GitHubIssuePayload["issue"]): EmbedBuilder {
    const embed = new EmbedBuilder()
        .setColor(getRandomColor())
        .setTitle(issue.title)
        .setURL(issue.html_url)
        .setAuthor({ name: issue.user.login, iconURL: issue.user.avatar_url })
        .setDescription(issue.body ? issue.body.substring(0, 4000) : "No description provided.")
        .addFields(
            { name: 'Status', value: issue.state, inline: true },
            { name: 'Comments', value: issue.comments.toString(), inline: true },
        )
        .setTimestamp(new Date(issue.created_at))
        .setFooter({ text: `Issue #${issue.number}` });

    if (issue.assignees && issue.assignees.length > 0)
        embed.addFields({ name: 'Assignees', value: issue.assignees.map(a => a.login).join(', ') });
    if (issue.labels && issue.labels.length > 0)
        embed.addFields({ name: 'Labels', value: issue.labels.map(l => l.name).join(', ') });
    if (issue.milestone)
        embed.addFields({ name: 'Milestone', value: issue.milestone.title });

    return embed;
}

export async function CreateThread(
    payload: GitHubIssuePayload,
    client: Client,
) {
    const issue = payload.issue;
    const forumChannel = await client.channels.fetch(process.env.FORUM_CHANNEL_ID!);
    if (!forumChannel) throw new Error("Failed to fetch channel.");

    if (forumChannel.type === ChannelType.GuildText || forumChannel.type === ChannelType.GuildForum) {
        const embed = createEmbed(issue);

        const thread = await forumChannel.threads.create({
            name: `Issue: ${issue.title}`,
            message: {
                embeds: [embed],
            },
        });

        await PinEmbedMessage(thread);

    } else throw new Error("Channel not found.");
}