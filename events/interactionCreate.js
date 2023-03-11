const { EmbedBuilder, InteractionType } = require('discord.js');

module.exports = (client, inter) => {
    if (inter.type === InteractionType.ApplicationCommand) {
        const DJ = client.config.opt.DJ;
        const command = client.commands.get(inter.commandName);

    if (!command) 
    return inter.reply({ embeds: [ 
        new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription('❌ | ¡Error! ¡Por favor, póngase en contacto con los desarrolladores!')], ephemeral: true, }),
         client.slash.delete(inter.commandName)

    if (command.permissions && !inter.member.permissions.has(command.permissions)) 
    return inter.reply({ 
        embeds: [ 
            new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`❌ | Necesita tener los permisos adecuados para ejecutar este comando`)], ephemeral: true, })

    if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) 
    return inter.reply({ 
        embeds: [ 
            new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`❌ | Este comando está reservado para miembros con el rol \`${DJ.roleName}\` `)], ephemeral: true, })

    if (command.voiceChannel) {
            if (!inter.member.voice.channel) 
            return inter.reply({ 
                embeds: [ 
                    new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`❌ | No estás en un Canal de Voz`)], ephemeral: true, })

            if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) 
            return inter.reply({ embeds: [ 
                new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(`❌ | No estás en el mismo canal de Voz`)], ephemeral: true, })
       }
        command.execute({ inter, client });
    }
    if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId)
        const file_of_button = customId.ffb
        const queue = player.getQueue(inter.guildId);
        if (file_of_button) {
            delete require.cache[require.resolve(`../src/buttons/${file_of_button}.js`)];
            const button = require(`../src/buttons/${file_of_button}.js`)
            if (button) return button({ client, inter, customId, queue });
        }
    }
};