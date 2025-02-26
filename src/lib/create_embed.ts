import { EmbedBuilder } from "discord.js";

import { EmbedType } from "#bot/lib/types";

export function createEmbed(embedInfo: EmbedType): EmbedBuilder {
  const embed = new EmbedBuilder();

  if (embedInfo.title) embed.setTitle(embedInfo.title);
  if (embedInfo.description) embed.setDescription(embedInfo.description);
  if (embedInfo.thumbnail) embed.setThumbnail(embedInfo.thumbnail);
  if (embedInfo.color) embed.setColor(embedInfo.color);
  if (embedInfo.footer) embed.setFooter(embedInfo.footer);
  if (embedInfo.timestamp) embed.setTimestamp(new Date(embedInfo.timestamp));
  if (embedInfo.author) embed.setAuthor(embedInfo.author);
  if (embedInfo.img) embed.setImage(embedInfo.img);
  if (embedInfo.fields) embed.addFields(...embedInfo.fields);

  return embed;
}