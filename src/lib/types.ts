import { APIEmbedField, ColorResolvable, EmbedAuthorOptions, EmbedFooterOptions } from "discord.js";

export type GitHubIssuePayload = {
    action: string;
    repository: {
        full_name: string;
    },
    issue: {
        number: number;
        title: string;
        html_url: string;
        body: string | null;
        state: string;
        comments: number;
        created_at: string;
        user: {
            login: string;
            avatar_url: string;
        };
        assignees: Array<{
            login: string;
        }> | null;
        labels: Array<{
            name: string;
        }> | null;
        milestone: {
            title: string;
        } | null;
    };
};

export type GitHubIssueCommentPayload = {
    action: "created" | "edited" | "deleted";
    issue: {
        number: number;
        title: string;
        html_url: string;
        state: string;
    };
    comment: {
        id: number;
        body: string;
        created_at: string;
        user: {
            login: string;
            avatar_url: string;
        };
    };
};

export type Repository = {
    github_repo_name: string;
    discord_guild_id: string;
    channel_id: string;
}

export type EmbedType = {
    title?: string;
    description?: string;
    thumbnail?: string;
    color?: ColorResolvable;
    footer?: EmbedFooterOptions;
    timestamp?: Date | number;
    author?: EmbedAuthorOptions;
    img?: string;
    fields?: APIEmbedField[];
    url?: string;
};