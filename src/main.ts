import express from "express"
import { Client, IntentsBitField, ChannelType } from "discord.js";
import { clientReadyEvent } from "#bot/events/ready";
import { CreateThread } from "#bot/webhook/create_thread";
import { DeleteThread } from "#bot/webhook/delete_thread";

const app = express();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
    ],
});

client.login(process.env.BOT_TOKEN);
app.use(express.json());

app.post("/github-webhook", async (req, res) => {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    if (event === "issues" && payload.action === "opened") {
        await CreateThread(payload, client);
    }
    if (event === "issues" && (payload.action === "closed" || payload.action === "deleted")) {
        await DeleteThread(payload, client);
    }

    res.status(200).send("Webhook received");
});


client.on("ready", () => clientReadyEvent(client));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});