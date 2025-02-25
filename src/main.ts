import express from "express"
import { Client, IntentsBitField } from "discord.js";
import expressListEndpoints from "express-list-endpoints";

import { clientReadyEvent } from "#bot/events/ready";
import { CreateThread } from "#bot/webhook/create_thread";
import { DeleteThread } from "#bot/webhook/delete_thread";
import { SendCommentEmbed } from "#bot/webhook/send_comment_embed";
import { LoggingMiddleware } from "#bot/lib/middleware/logging_middleware";
import { listRepos, unwatch, watch } from "#bot/commands/index"
import { asyncHandler, ExceptionMiddleware } from "#bot/lib/middleware/exception_middleware";

const app = express();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
    ],
});

client.login(process.env.BOT_TOKEN);
app.use(express.json());
app.use(LoggingMiddleware);

app.post("/github-webhook", asyncHandler(async (req: express.Request, res: express.Response) => {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    if (event === "issues" && payload.action === "opened")
        await CreateThread(payload, client);
    if (event === "issues" && (payload.action === "closed" || payload.action === "deleted"))
        await DeleteThread(payload, client);
    if (event === "issue_comment" && payload.action === "created")
        await SendCommentEmbed(payload, client);

    res.status(200).send("Webhook received");
}));

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "watch":
            await watch.execute(interaction);
            break;
        case "unwatch":
            await unwatch.execute(interaction);
            break;
        case "list-repos":
            await listRepos.execute(interaction);
            break;
    }
});

client.on("ready", () => clientReadyEvent(client));

app.use(ExceptionMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(
        expressListEndpoints(app).sort((e1, e2) =>
            e1.path.localeCompare(e2.path),
        ),
    );
});