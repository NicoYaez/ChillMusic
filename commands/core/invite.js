const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: "Invitar el bot a tu servidor.",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`Invitar **${client.user.username}** a tu servidor. [Click para Invitar](https://discord.com/api/oauth2/authorize?client_id=1032640195218128976&permissions=8&scope=bot%20applications.commands)`)
        .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
        .setFooter({ text: `${client.user.username} - by NicoYaez#0003`, iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};