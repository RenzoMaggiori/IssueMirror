import { Client, ChannelType, TextChannel } from "discord.js";

import { GitHubIssueCommentPayload } from "#bot/lib/types";
import { getRandomColor } from "#bot/lib/random_color";
import { createEmbed } from "#bot/lib/create_embed";

export async function SendCommentEmbed(payload: GitHubIssueCommentPayload, client: Client) {
    const issue = payload.issue;
    const comment = payload.comment;
    const forumChannel = await client.channels.fetch(process.env.FORUM_CHANNEL_ID!) as TextChannel;

    if (forumChannel && (forumChannel.type === ChannelType.GuildText || forumChannel.type === ChannelType.GuildForum)) {
        const thread = forumChannel.threads.cache.find(t => t.name === `Issue: ${issue.title}`);

        if (!thread) throw new Error("Thread not found.");

        const embed = createEmbed({
            color: getRandomColor(),
            timestamp: new Date(comment.created_at),
            author: { name: comment.user.login, iconURL: comment.user.avatar_url },
            description: comment.body,
            footer: { text: `Comment on Issue #${issue.number}` },
        });
        thread.send({ embeds: [embed] });
    }
}
