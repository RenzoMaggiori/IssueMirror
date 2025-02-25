import { Client, REST, Routes } from "discord.js";
import { watch, unwatch, listRepos } from "#bot/commands/index";

export async function clientReadyEvent(client: Client) {
  const rest = new REST().setToken(process.env.BOT_TOKEN!);

  const commands = [watch.data, unwatch.data, listRepos.data];

  try {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationCommands(client.user!.id), { body: commands });
    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.error("Failed to register slash commands:", error);
  }
}