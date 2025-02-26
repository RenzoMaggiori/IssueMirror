## Watch Command

The `/watch` command is used to start mirroring GitHub issues into a specified Discord channel. This allows you to track and manage GitHub issues directly within your Discord server.

### Syntax

```plaintext
/watch <repository_name> <channel_id>
```

- **repository_name**: The name of the GitHub repository you want to mirror (e.g., `owner/repo`).
- **channel_id**: The ID of the Discord channel where issues will be mirrored.

> [!NOTE]
> The `channel_id` must be from a forum type channel.

### Example

```plaintext
/watch RenzoMaggiori/IssueMirror 123456789012345678
```

### How It Works

1. **GitHub Webhook Setup**: Ensure you have a GitHub webhook set up to trigger notifications for issues in your repository.
2. **Discord Channel**: Specify the Discord channel where you want to receive issue updates.
3. **Mirroring**: The bot will mirror new issues and updates from GitHub to the specified Discord channel.

### Benefits

- **Real-time Updates**: Stay informed about new issues and updates in real-time.
- **Streamlined Workflow**: Manage GitHub issues directly from your Discord server.

This section explains how to use the `/watch` command, its syntax, and how it integrates with GitHub webhooks to mirror issues into Discord.