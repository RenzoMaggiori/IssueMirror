// src/lib/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";
import { Repository } from "./types";

dotenv.config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Add a repository to watch
export async function addRepository(guildId: string, repoName: string, channel_id: string) {
  const query = `
    INSERT INTO server_repositories (discord_guild_id, github_repo_name, channel_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (discord_guild_id, github_repo_name, channel_id) DO NOTHING;
  `;
  await db.query(query, [guildId, repoName, channel_id]);
}

// Remove a repository from being watched
export async function removeRepository(guildId: string, repoName: string) {
  const query = `
    DELETE FROM server_repositories
    WHERE discord_guild_id = $1 AND github_repo_name = $2;
  `;
  await db.query(query, [guildId, repoName]);
}

// List all watched repositories for a server
export async function listRepositories(github_repo_name: string): Promise<Repository[]> {
  const query = `
    SELECT github_repo_name, discord_guild_id, channel_id
    FROM server_repositories
    WHERE github_repo_name = $1;
  `;
  const result = await db.query(query, [github_repo_name]);
  return result.rows;
}


export default db;