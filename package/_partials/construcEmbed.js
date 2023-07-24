const { EmbedBuilder } = require('discord.js');

function constructToEmbed(dataArray) {

  const embeds = [];

  for (const data of dataArray) {
    const { user, title, description, footer, fields } = data;

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor('#FFB347')
      .setTimestamp();

    if (description) {
      embed.setDescription(description);
    }

    if (user) {
      embed.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }));
    }

    if (footer) {
      embed.setFooter({ text: footer});
    }


    for (const field of fields) {
      const { name, value, inline } = field;
      embed.addFields({ name, value, inline });
    }


    embeds.push(embed);
  }
  return embeds;
}

module.exports = constructToEmbed;
