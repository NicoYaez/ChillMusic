const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volumen',
    description: 'Ajustar el volumen de la musica.',
    voiceChannel: true,
    options: [
        {
            name: 'volumen',
            description: 'Volumen [1 al 100]',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

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
        const vol = inter.options.getNumber('volumen')

        if (queue.volume === vol) 
        return inter.reply({
            embeds: [
                {
                    description: `El volumen que quieres cambiar ya es el actual ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        });

        const success = queue.setVolume(vol);

        return inter.reply(success ?{
            embeds: [
                {
                    description: `El volumen ha sido modificado a **${vol}**/**${maxVol}**% 🔊`,
                    color: 0x3498DB
                }
            ]
        } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);
    },
};