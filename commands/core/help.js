const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Todos los comandos del bot.",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`**${client.user.username}** es un bot de música que te permite escuchar canciones de **Youtube**, **Spotify** y **SoundCloud**.\nDesarrollado sin fines de lucro. \n\nRepositorio:[NicoYaez/ChillMusic](https://github.com/NicoYaez/ChillMusic).`)
        .addFields([ { name: `Comandos activos - ${commands.size}`, value: commands.map(x => `\`/${x.name}\``).join(' | ') } ])
        .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
        .setFooter({ text: `${client.user.username} - by NicoYaez#0003`, iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};