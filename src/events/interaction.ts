import { CacheType, ChatInputCommandInteraction, Interaction } from "discord.js";

import { help, listRepos, unwatch, usage, watch } from "#bot/commands/index";

const commandHandlers: { [key: string]: (interaction: ChatInputCommandInteraction) => Promise<void> } = {
    "watch": watch.execute,
    "unwatch": unwatch.execute,
    "list-repos": listRepos.execute,
    "help": help.execute,
    "usage": usage.execute,
};

export async function interactionCreated(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    const handler = commandHandlers[interaction.commandName];
    if (!handler) {
        await interaction.reply(`Unknown command: ${interaction.commandName}`);
        return;
    }
    await handler(interaction as ChatInputCommandInteraction);
}
