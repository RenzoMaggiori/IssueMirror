# Issue Mirror

**Issue Mirror** is a Discord bot that synchronizes GitHub issues with Discord channels, providing real-time updates and facilitating collaboration between GitHub and Discord communities.

## 📖 Features

- Automatically creates Discord threads for new GitHub issues
- Updates Discord threads when issues are modified or closed
- Deletes Discord threads when GitHub issues are closed or deleted
- Supports multiple GitHub repositories per Discord server
- Customizable channel mapping for different repositories

## 🚀 Setup

1. Invite the bot to your Discord server using [this link](https://discord.com/oauth2/authorize?client_id=1343952118842916926&permissions=8&integration_type=0&scope=bot+applications.commands).
2. Use the `/watch` command to set up repository tracking:
   ```
   /watch <repo_name> <channel_id>
   ```
3. Ensure the bot has necessary permissions in the configured channel.

> [!NOTE]
> For more a more detailed guide and documentation go to [Mirror Issues](https://renzo.gitbook.io/issue-mirror/user-manual/getting-started)

## ⚙️ Commands

- `/watch`: Add a repository to track in a specific channel
- `/unwatch `: Stop tracking a repository
- `/list-repos`: List all tracked repositories for the server

## 💾 Self-Hosting

To host Issue Mirror yourself:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables in a `.env` file:
   ```env
   DISCORD_TOKEN=<your_discord_bot_token>
   SUPABASE_URL=<your_supabase_project_url>
   SUPABASE_KEY=<your_supabase_api_key>
   PORT=<port_number>
   ```
4. Build the project: `pnpm build`
5. Start the bot: `pnpm start`

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

| [<img src="https://github.com/RenzoMaggiori.png?size=85" width=85><br><sub>Renzo Maggiori</sub>](https://github.com/RenzoMaggiori)
|:---:|