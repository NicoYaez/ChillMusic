const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Detener la musica.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        });

        queue.destroy();

        inter.reply({
            embeds: [
                {
                    description: `La música se detuvo en este servidor, hasta la próxima.`,
                    color: 0xED4245
                }
            ]
        });

        const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setDescription(`Gracias por Utilizar **Chill Music**.`)
        .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
        inter.channel.send({ embeds: [embed]});
    },
};