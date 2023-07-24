const { ChannelType } = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

const { formatDuration, constructToSelectMenu, constructToEmbed, constructToActionRow, messageDelete } = require('../../../_partials');
const { Guild } = require('../../../schemas');

module.exports = {
  name: 'botinfo',
  description: 'command.description.botinfo',
  aliases: ['binfo', 'i'],
  use: '<prefix>botinfo',
  category: 'Bot',
  async execute(client, message) {

    const { apolloClient } = client;

    const { data } = await apolloClient.query({
      query: Guild,
      variables: {
        id: message.guild.id
      }
    });
    const { guild } = data;

    const clientInfo = {
      uptime: formatDuration(client.uptime),
      usages: guild.usages,
      ping: client.ws.ping,
      created: moment(client.user.createdAt).format('DD/MM/YYYY'),
      guilds: client.guilds.cache.size,
      lastGuild: client.guilds.cache.last().name,
      users: client.users.cache.size,
      roles: client.guilds.cache.reduce((acc, guild) => acc + guild.roles.cache.size, 0),
      channelsVoice: client.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
      channelsText: client.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
      shards: client.shardsCount ?? 0,
      memory: {
        used: process.memoryUsage().heapUsed / 1024 / 1024,
        total: process.memoryUsage().heapTotal / 1024 / 1024
      }
    };

    const dataEmbeds = [
      {
        user: client.user,
        title: 'Informaçãoes Gerais',
        description: `- **Olá!** Meu nome é **Lumia** e sou um bot do Discord projetado para ajudar no gerenciamento do seu servidor. Fui cuidadosamente desenvolvido com uma variedade de comandos para fornecer suporte completo às suas necessidades. Comecei a ser desenvolvido em \`05/07/2023\` e estou ansioso para ser adicionado ao seu **servidor**. Faça o login em sua conta e aproveite tudo o que tenho a oferecer! \n- Foi utilizado \`${clientInfo.usages}\` comandos nas ultimas 2 horas\n- Meu criador: \`gms1945\` `,
        fields: [
          {
            name: 'Ping', 
            value: `\`${clientInfo.ping}\``, 
            inline: false
          },
          {
            name: 
            'Atividade', 
            value: ` \`${clientInfo.uptime}\``, 
            inline: false
          },
          {
            name: 'Criado', 
            value: `\`${clientInfo.created}\``, 
            inline: false
          },
          {
            name: 'Links',
            value: '[Server Suporte](https://discord.gg/j2zexkkAYZ)\n[Me Adicione](https://discord.com/oauth2/authorize?client_id=761402614558228500&scope=bot&permissions=2147483647)\n[Vote em Mim](https://bluephoenixlist.xyz/bot/761402614558228500)',
            inline: true
          },
        ],
        footer: '❤ Feito com carinho é amor por team lumia: gms1945, tashimi2040, davvits and yorkut',
      },

      {
        title: 'Informaçãoes Guilds',
        fields: [
          { name: 'Servidores', value: `Estou em \`${clientInfo.guilds}\``, inline: true },
          { name: 'Último servidor', value: `\`${clientInfo.lastGuild}\``, inline: true },
          { name: 'Usuarios', value: `Observando \`${clientInfo.users}\``, inline: true },
          { name: 'Cargos', value: `Gerenciando \`${clientInfo.roles}\``, inline: true },
          { name: 'Canais de Voz', value: `Total: \`${clientInfo.channelsVoice}\``, inline: true },
          { name: 'Canais de Texto', value: `Total: \`${clientInfo.channelsText}\``, inline: true },
        ]
      },

      {
        title: 'Informações Tecnicas',
        fields: [
          {name: 'Language', value: '<:Java_Js:1129153322012659884>`JavaScript` '},
          {name: 'Cluster\'s', value: `\`${clientInfo.shards}\``},
          {name: 'Mémoria | RAM', value: `\`${clientInfo.memory.used.toFixed(2)}MB/${clientInfo.memory.total.toFixed(0)}MB\``},
        ]
      }
    ];
    
    const dataSelect = [
      {
        placeholder: 'Informações',
        customId: 'esc',
        options: [
          {
            label: 'Geral',
            description: 'Possui informações gerais minha',
            value: 'inicio'
          },
          {
            label: 'Guilds',
            description: 'Possui informações sobre as guilds que gerencio',
            value: 'guild'
          },
          {
            label: 'Tecnicos',
            description: 'Possui informações minhas tecnicas',
            value: 'tec'
          }
        ]
      }
    ];

    const menu = constructToSelectMenu(dataSelect);
    const row = constructToActionRow(menu);
    const embed = constructToEmbed(dataEmbeds);
    const msg = await message.reply({ embeds: [embed[0]], components: [row] });

    const filter = (m) => m.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({filter, time: 50000 });
            
    collector.on('collect', async (interaction) => {
      const select = interaction.values[0];

      if (interaction.customId === 'esc') {

        if (select === 'inicio') {

          await interaction.deferUpdate();
          await msg.edit({ embeds: [embed[0]], components: [row] }).catch(() => {});
        }

        if (select === 'guild') {

          await interaction.deferUpdate();
          await msg.edit({ embeds: [embed[1]], components: [row] }).catch(() => {});
        }

        if (select === 'tec') {

          await interaction.deferUpdate();
          await msg.edit({ embeds: [embed[2]] });
        }

      }
    });
    collector.on('end', async () => {
      if (!message.author.bot && message.content.startsWith(guild.prefix)){
        message.delete().catch(() => {});
      }
      messageDelete(msg, 0);
    });
  }
};