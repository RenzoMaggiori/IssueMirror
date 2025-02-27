import { ChannelType, Client, TextChannel } from "discord.js";

import { getReposByName } from "#bot/lib/db";
import { GitHubIssuePayload } from "#bot/lib/types";

export async function DeleteThread(payload: GitHubIssuePayload, client: Client) {
    const issue = payload.issue;
    const repoName = payload.repository.full_name;
    const issueTitle = issue.title;

    const repos = await getReposByName(repoName);

    if (repos.length === 0) throw new Error(`No repository found for ${repoName}`);

    for (const repo of repos) {
        const channelId = repo.channel_id;

        if (!channelId)
            continue;

        const channel = await client.channels.fetch(channelId) as TextChannel;

        if (channel && (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildForum)) {
            const thread = channel.threads.cache.find((t) => t.name === `Issue: ${issueTitle}`);

            if (thread)
                thread.delete('Issue closed or deleted');
        }
    }
}