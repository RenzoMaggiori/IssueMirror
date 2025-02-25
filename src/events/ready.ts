import { Client } from "discord.js";

export function clientReadyEvent(client: Client) {
  if (!client.user) {
    console.log("Invalid client user.");
    return;
  }
  console.log(`${client.user.username} is connected.`);
}