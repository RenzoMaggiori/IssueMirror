## Unwatch Command

The `/unwatch` command is used to stop mirroring GitHub issues from a repository into a Discord channel. This allows you to manage which repositories are actively being tracked within your Discord server.

### Syntax

```plaintext
/unwatch <repository_name>
```

- **repository_name**: The name of the GitHub repository you want to stop mirror (e.g., `owner/repo`).

### Example

```plaintext
/unwatch RenzoMaggiori/IssueMirror
```

### How It Works

1. **Stop Mirroring**: The bot will stop sending updates for the specified repository to your Discord server.
2. **GitHub Webhook**: You may also want to disable the GitHub webhook for the repository if you no longer need notifications.

### Benefits

- **Customize Tracking**: Easily manage which repositories you want to track or ignore.
- **Reduce Noise**: Stop receiving unnecessary updates for repositories you're no longer interested in.

This section explains how to use the `/unwatch` command to stop mirroring GitHub issues into Discord, allowing users to customize their tracking setup.