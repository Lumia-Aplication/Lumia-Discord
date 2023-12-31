const { ButtonStyle } = require('discord.js');

const { User } = require('../../../schemas');
const { constructToActionRow, constructToButton, constructToEmbed, messageDelete } = require('../../../_partials');
const setLang = require('../../../_partials/user/setLang');

module.exports = {
  name: 'setlang',
  category: 'Bot',
  aliases: ['changelang', 'setlanguage'],
  use: '<prefix>setlang',
  description: 'command.description.setLang',
  async execute(client, message) {
    const { t, apolloClient } = client;

    const { data } = await apolloClient.query({
      query: User,
      variables: {
        id: message.author.id
      }
    });
    const { user } = data;

    const contentEmbed = [    
      {
        title: t('setlang.title', { lng: user.lang, username: message.author.username }),
        description: t('setlang.description', { lng: user.lang, langDefault: t('langBR', { lng: user.lang }), userLang: user.lang.replace('en', t('langEN', { lng: user.lang })).replace('br', t('langBR', { lng: user.lang })) }),
        user: message.author
      }
    ];

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
    const embed = constructToEmbed(contentEmbed);
  
    const messageChannel = await message.reply({ embeds: [embed[0]], components: [row] });
    
    const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

    const collector = messageChannel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      messageDelete(messageChannel, 0);
      
      if (interaction.customId == 'br') {
        
        await setLang(interaction.user.id, 'br');
        interaction.reply({ content: t('setlang.successChange', { lng: user.lang, setedLang: t('langBR') }), ephemeral: true });
      } else if (interaction.customId == 'en') {

        await setLang(interaction.user.id, 'en');
        await interaction.reply({ content: t('setlang.successChange', { lng: user.lang, setedLang: t('langEN') }), ephemeral: true });
      }
    });

    collector.on('end', async () => {
      messageDelete(messageChannel, 0);
    });

  }
};
