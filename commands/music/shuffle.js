module.exports = {
    name: 'shuffle',
    description: 'Activar el modo aleatorio.',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });


        if (!queue.tracks[0]) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música en la cola de reproducción después de la actual ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });

        await queue.shuffle();

        return inter.reply({
            embeds: [
                {
                    description: `🔀 Se activo el modo **Aleatorio** para **${queue.tracks.length}** canciones! `,
                    color: 0x3498DB
                }
            ]
        });
    },
};