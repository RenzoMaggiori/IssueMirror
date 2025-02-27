# Getting Started

Issue Mirror is a Discord bot designed to mirror GitHub issues into Discord channels, enhancing collaboration and issue tracking across platforms. Here's a step-by-step guide to get you started:

## Step 1: Invite the Bot
   - Invite the bot to your discord server with by clicking [here](https://discord.com/oauth2/authorize?client_id=1343952118842916926).
   - Select the server where you want to add the bot.
   - Click **Authorize**.

## Step 2: Configure GitHub Webhook

1. **Navigate to Your GitHub Repository**:
   - Go to the GitHub repository you want to track.
   - Click on **Settings** > **Webhooks**.

2. **Add a New Webhook**:
   - Click **Add webhook**.
   - In the **Payload URL**, enter the URL https://issuemirror.onrender.com/github-webhook where the bot will receive webhook notifications.
   - Set **Content type** to **application/json**.
   - Choose the events **Issues**, **Issue Comments** and **Sub Issues**.
   - Click **Add Webhook**.

## Step 3: Set Up the Bot

1. **Use the `/watch` Command**:
   - In your Discord server, use the `/watch` command to start mirroring issues from your GitHub repository.
   - Example: `/watch your-repo-name your-channel-id`

2. **Verify Setup**:
   - Ensure that the bot is successfully mirroring issues to the specified channel.

## Troubleshooting

- **Check Permissions**: Ensure the bot has the necessary permissions to send messages in the channel.
- **Verify Webhook**: Confirm that the webhook is correctly set up and receiving notifications.