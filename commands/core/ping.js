const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Ver el ping del bot.",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`API Latencia es de **${Math.round(client.ws.ping)}ms** 🛰️\n Última latencia calculada hace **${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: false })}** atras`)
        .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
        .setFooter({ text: `${client.user.username} - by NicoYaez#0003`, iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.editReply({ embeds: [embed] });

    },
};