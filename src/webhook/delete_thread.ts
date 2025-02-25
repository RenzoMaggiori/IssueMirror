import { ChannelType, Client, TextChannel } from "discord.js";

export async function DeleteThread(payload: any, client: Client) {
    const issue = payload.issue;
    const issueTitle = issue.title;

    const channelId = process.env.FORUM_CHANNEL_ID!;
    const channel = await client.channels.fetch(channelId) as TextChannel;

    if (!channel) throw new Error("Channel not found");
    if (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildForum) {
        const threadName = `Issue: ${issueTitle}`;
        const thread = channel.threads.cache.find((t) => t.name === threadName);

        if (!thread) throw new Error("Thread not found.");
        const deletedThread = await thread.delete('Issue closed or deleted');

        if (!deletedThread) throw new Error("Failed to delete thread.");
    }
}