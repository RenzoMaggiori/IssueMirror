import { createClient } from "@supabase/supabase-js";

import { Repository } from "#bot/lib/types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function addRepository(guildId: string, repoName: string, channel_id: string) {
  const { data, error } = await supabase
    .from("server_repositories")
    .upsert(
      { discord_guild_id: guildId, github_repo_name: repoName, channel_id },
      { onConflict: "discord_guild_id,github_repo_name,channel_id" }
    );

  if (error) {
    console.error("Error adding repository:", error);
    throw error;
  }
  return data;
}

export async function removeRepository(guildId: string, repoName: string) {
  const { data, error } = await supabase
    .from("server_repositories")
    .delete()
    .eq("discord_guild_id", guildId)
    .eq("github_repo_name", repoName);

  if (error) {
    console.error("Error removing repository:", error);
    throw error;
  }
  return data;
}

export async function getReposByName(github_repo_name: string): Promise<Repository[]> {
  const { data, error } = await supabase
    .from("server_repositories")
    .select("*")
    .eq("github_repo_name", github_repo_name);

  if (error) {
    console.error("Error fetching repositories by name:", error);
    throw error;
  }
  return data as Repository[];
}

export async function getReposByGuildId(guild_id: string): Promise<Repository[]> {
  const { data, error } = await supabase
    .from("server_repositories")
    .select("*")
    .eq("discord_guild_id", guild_id);

  if (error) {
    console.error("Error fetching repositories by guild ID:", error);
    throw error;
  }
  return data as Repository[];
}

export default supabase;