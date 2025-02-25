import { ChannelType, Client, TextChannel } from "discord.js";

export async function DeleteThread(payload: any, client: Client) {
    const issue = payload.issue;
    const issueTitle = issue.title;

    const channelId = process.env.FORUM_CHANNEL_ID!;
    const channel = await client.channels.fetch(channelId) as TextChannel;

    if (channel && (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildForum)) {
        const threadName = `Issue: ${issueTitle}`;
        const thread = channel.threads.cache.find((t) => t.name === threadName);

        if (thread) {
            try {
                await thread.delete('Issue closed or deleted');
                console.log(`Thread deleted for issue: ${issueTitle}`);
            } catch (error) {
                console.error("Failed to delete thread:", error);
            }
        } else {
            console.log("Thread not found.");
        }
    }
}