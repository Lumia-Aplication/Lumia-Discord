const { ButtonStyle } = require('discord.js');

const User = require('@lumia/schemas/user.js');

const { constructToActionRow, constructToButton, constructToEmbed, messageDelete } = require('../../_partials');
const setLang = require('../../_partials/user/setLang');

module.exports = {
  name: 'setlang',
  description: 'Setar uma linguagem ao usuario',
  async execute(client, message) {
    const { t } = client;

    const user = await User.findOne({ userId: message.author.id });

    const contentEmbed = {
      title: t('setlang.title', { lng: user.lang, username: message.author.username }),
      description: t('setlang.description', { lng: user.lang, langDefault: t('langBR', { lng: user.lang }), userLang: user.lang.replace('en', t('langEN', { lng: user.lang })).replace('br', t('langBR', { lng: user.lang })) }),
      user: message.author
    };

    const buttons = [
      {
        label: t('langBR', { lng: user.lang }),
        customId: 'br',
        icon: '<:Brazil:1124893878554734706>',
        color: ButtonStyle.Primary
      },
      {
        label: t('langEN', { lng: user.lang }),
        customId: 'en',
        icon: '<:flag_us48:1124894096570466344>',
        color: ButtonStyle.Danger
      }
    ];

    const button = constructToButton(buttons);
    const row = constructToActionRow(button);
    const embed = constructToEmbed(contentEmbed.user, contentEmbed.title, contentEmbed.description);
  
    const messageChannel = await message.reply({ embeds: [embed], components: [row] });
    
    const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

    const collector = messageChannel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      await interaction.deferUpdate();
      messageDelete(messageChannel, 0);

      if (interaction.customId == 'br') {

        await setLang(interaction.user.id, 'br');

        const messageSuccessBR = await message.channel.send({ content: t('setlang.successChange', { lng: user.lang, setedLang: t('langBR') }), ephemeral: true });
        messageDelete(messageSuccessBR, 8000);
      } else if (interaction.customId == 'en') {

        await setLang(interaction.user.id, 'en');

        const messageSuccessEN = await message.channel.send({ content: t('setlang.successChange', { lng: user.lang, setedLang: t('langEN') }), ephemeral: true });
        messageDelete(messageSuccessEN, 8000);
      }
    });

    collector.on('end', async () => {
      messageDelete(messageChannel, 0);
    });

  }
};
