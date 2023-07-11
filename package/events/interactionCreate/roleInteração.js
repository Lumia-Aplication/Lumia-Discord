module.exports = async (client, interaction) => {
    if(interaction.customId === 'EN'){
        await interaction.deferUpdate()
        interaction.roles?.add('1122720820356206653')
        interaction.followUp('a')
    }
    if(interaction.customId === 'PT'){
        await interaction.deferUpdate()
        interaction.roles?.add('1122720618878599218')
        interaction.followUp('a')
    }
}