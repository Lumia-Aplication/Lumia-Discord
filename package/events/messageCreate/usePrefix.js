
module.exports = async (client, message) => {
    const { guildService } = client

    const agora = new Date();
    client.guilds.cache.forEach(async (guild) => {
    const comando = await guildService.findOne({ guildId: guild.id })
    
    const args = message.content.slice(comando.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)

    if (agora - comando.lastReset >= 2 * 60 * 60 * 1000) {
    await guildService.findOneAndUpdate({ guildId: guild.id },{ $set: { usages: 0, lastReset: agora } })
} else if (command){
    await guildService.findOneAndUpdate({ guildId: guild.id },{ $inc: { usages: 1} })
}
    })
}