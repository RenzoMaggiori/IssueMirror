import { ChannelType, Client } from "discord.js";

type GitHubIssuePayload = {
    issue: {
        title: string;
        html_url: string;
        body: string;
    };
    action: string;
}

export async function CreateThread(
    payload: GitHubIssuePayload,
    client: Client,
) {
    const issue = payload.issue;
    try {
        const forumChannel = await client.channels.fetch(process.env.FORUM_CHANNEL_ID!);
        if (forumChannel && (forumChannel.type === ChannelType.GuildText || forumChannel.type === ChannelType.GuildForum)) {
            console.log("Channel fetched successfully.");
            forumChannel.threads
                .create({
                    name: `Issue: ${issue.title}`,
                    message: {
                        content: `**New Issue Created:**\n${issue.html_url}\n\n${issue.body ?? ""}`,
                    },
                })
                .then(() => {
                    console.log(`Discussion created for issue: ${issue.title}`);
                })
                .catch((err) => {
                    console.error("Failed to create discussion:", err);
                });
        } else {
            console.log("Channel not found.");
        }
    } catch (error) {
        console.error("Failed to fetch channel:", error);
    }
}