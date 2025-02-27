import { ChannelType, Client, EmbedBuilder, ForumChannel, ThreadChannel } from "discord.js";

import { GitHubIssuePayload } from "#bot/lib/types";
import { getRandomColor } from "#bot/lib/random_color";
import { getReposByName } from "#bot/lib/db";
import { createEmbed } from "#bot/lib/create_embed";

async function PinEmbedMessage(thread: ThreadChannel) {
    const messages = await thread.messages.fetch({ limit: 1 });
    const firstMessage = messages.first();

    if (firstMessage) await firstMessage.pin();
}

function createThreadEmbed(issue: GitHubIssuePayload["issue"]): EmbedBuilder {
    const embed = createEmbed({
        color: getRandomColor(),
        timestamp: new Date(issue.created_at),
        title: issue.title,
        description: issue.body ? issue.body.substring(0, 4000) : "No description provided.",
        author: { name: issue.user.login, iconURL: issue.user.avatar_url },
        footer: { text: `Issue #${issue.number}` },
        fields: [
            { name: 'Status', value: issue.state, inline: true },
            { name: 'Comments', value: issue.comments.toString(), inline: true },
        ]
    });

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
    const repoName = payload.repository.full_name;
    const servers = await getReposByName(repoName);

    for (const server of servers) {
        const guild = client.guilds.cache.get(server.discord_guild_id);
        if (!guild) continue;

        const forumChannel = guild.channels.cache.find(
            (channel) => channel.type === ChannelType.GuildForum && channel.id === server.channel_id,
        ) as ForumChannel | undefined;

        if (!forumChannel) throw new Error("Channel not found.");

        const embed = createThreadEmbed(payload.issue);
        const thread = await forumChannel.threads.create({
            name: `Issue: ${payload.issue.title}`,
            message: {
                embeds: [embed]
            },
        });
        await PinEmbedMessage(thread);
    }
}