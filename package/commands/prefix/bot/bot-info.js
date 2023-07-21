const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, PermissionsBitField, PermissionFlagsBits} = require('discord.js')
const {messageDelete } = require('../../../_partials')


module.exports = {
    name: 'bot-info',
    description: 'Vê as informações do bot.',
    aliases: ['info', 'i'],
    async execute(client, message){
        const { guildService } = client
        
        const guild = await guildService.findOne({ guildId: message.guild.id })
        
        const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
        .setCustomId('esc')
        .setPlaceholder('Informações')
        .addOptions([
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
        ])
        )
        
        const used = process.memoryUsage().heapUsed / 1024 / 1024
        const total = process.memoryUsage().heapTotal / 1024 / 1024
        const uptime = client.uptime

        const seconds = Math.floor(uptime / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const up = client.user.createdAt

        const embed = new EmbedBuilder()
        .setTitle('Informaçãoes Gerais')
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 128}))
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`- **Olá!** Meu nome é **Lumia** e sou um bot do Discord projetado para ajudar no gerenciamento do seu servidor. Fui cuidadosamente desenvolvido com uma variedade de comandos para fornecer suporte completo às suas necessidades. Comecei a ser desenvolvido em \`05/07/2023\` e estou ansioso para ser adicionado ao seu **servidor**. Faça o login em sua conta e aproveite tudo o que tenho a oferecer! \n- Foi utilizado \`${guild.usages}\` comandos nas ultimas 2 horas\n- Meu criador: \`gms1945\``)
        .setFields(
            {name: 'Ping', value: `\`${client.ws.ping}\``, inline: false},
            {name: 'Atividade', value: ` \`${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s\``, inline: false},
            {name: 'Criado', value: `\`${up.getDate()}/${up.getMonth() + 1}/${up.getFullYear()}\``, inline: false},
            {name: 'Links', value: `[Server Suporte](https://discord.gg/j2zexkkAYZ)\n[Me Adicione](https://discord.com/oauth2/authorize?client_id=761402614558228500&scope=bot&permissions=2147483647)\n[Vote em Mim](https://bluephoenixlist.xyz/bot/761402614558228500)`},
        )
        .setFooter({text: '❤ Feito com carinho é amor por team lumia: gms1945, tashimi2040, davvits and yorkut'})
        .setColor('#FFB347') 
        
        let usuarios = []
        let cargos = []
        client.guilds.cache.forEach((guild) => {guild.members.cache.forEach((member) => {usuarios.push(member)})})
        client.guilds.cache.forEach((guild) => {guild.roles.cache.forEach((role) => {cargos.push(role)})})

        const embed2 = new EmbedBuilder()
        .setTitle('Informaçãoes Guilds')
        .setFields(
            { name: 'Servidores', value: `Estou em \`${client.guilds.cache.size}\``, inline: true },
            { name: 'Último servidor', value: `\`${client.guilds.cache.last().name}\``, inline: true },
            { name: 'Usuarios', value: `Observando \`${usuarios.length}\``, inline: true },
            { name: 'Cargos', value: `Gerenciando \`${cargos.length}\``, inline: true },
            { name: 'Canais de Voz', value: `Total: \`${client.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\``, inline: true },
            { name: 'Canais de Texto', value: `Total: \`${client.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\``, inline: true },
            
            )
            .setFooter({text: '❤ Feito com carinho é amor por team lumia: gms1945, tashimi2040, davvits and yorkut'}) 
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 128}))
            .setColor('#FFB347')
            
            
            
            const embed3 = new EmbedBuilder()
            .setTitle('Informaçãoes Tecnicas')
            .setFields(
                {name: 'Language', value:'<:Java_Js:1129153322012659884>\`JavaScript\`'},
                {name: `Cluster's`, value: `\`${client.shardsCount ?? 0}\``},
                {name: 'Mémoria | RAM', value: `\`${used.toFixed(2)}MB/${total.toFixed(0)}MB\``},
            )
            .setFooter({text: '❤ Feito com carinho é amor por team lumia: gms1945, tashimi2040, davvits and yorkut'}) 
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 128}))
            .setColor('#FFB347')
            

            const msg = await message.reply({content: `${message.author}` ,embeds: [embed], components: [row]})
            
            const filter = (m) => m.user.id === message.author.id
            const collector = msg.createMessageComponentCollector({filter, time: 20000 })
            
        collector.on('collect', async (interaction) => {
            if(interaction.customId === 'esc'){
                const select = interaction.values[0]
                if(select === 'inicio'){
                    await interaction.deferUpdate()
                    await msg.edit({embeds: [embed], components: [row]}).catch(() => {null})
                }
                if(select === 'guild'){
                    await interaction.deferUpdate()
                    await msg.edit({embeds: [embed2], components: [row]}).catch(() => {null})
                }
                if(select === 'tec'){
                    await interaction.deferUpdate()
                    await msg.edit({embeds: [embed3]})
                }
            }
        })
        collector.on('end', async () => {
            if (!message.author.bot && message.content.startsWith(guild.prefix)){
                message.delete().catch(() => {null})
            }
            messageDelete(msg, 0)
        })
    }
}
