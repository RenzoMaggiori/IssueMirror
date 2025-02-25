import { Client, ChannelType, EmbedBuilder, TextChannel } from "discord.js";
import { GitHubIssueCommentPayload } from "#bot/lib/types";
import { getRandomColor } from "#bot/lib/random_color";

export async function SendCommentEmbed(payload: GitHubIssueCommentPayload, client: Client) {
    const issue = payload.issue;
    const comment = payload.comment;
    const forumChannel = await client.channels.fetch(process.env.FORUM_CHANNEL_ID!) as TextChannel;

    if (!forumChannel) throw new Error("Failed to fetch channel.");
    if (forumChannel.type === ChannelType.GuildText || forumChannel.type === ChannelType.GuildForum) {
        const thread = forumChannel.threads.cache.find(t => t.name === `Issue: ${issue.title}`);

        if (!thread) throw new Error("Thread not found.");

        const embed = new EmbedBuilder()
            .setColor(getRandomColor())
            .setAuthor({ name: comment.user.login, iconURL: comment.user.avatar_url })
            .setDescription(comment.body)
            .setTimestamp(new Date(comment.created_at))
            .setFooter({ text: `Comment on Issue #${issue.number}` });

        await thread.send({ embeds: [embed] });
    }
}
