CREATE TABLE server_repositories (
    id SERIAL PRIMARY KEY,
    discord_guild_id TEXT NOT NULL,
    github_repo_name TEXT NOT NULL,
    channel_id TEXT NOT NULL,
    UNIQUE(discord_guild_id, github_repo_name, channel_id)
);