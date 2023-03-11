module.exports = {
    name: 'clear',
    description: 'Borrar toda la música en la cola',
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
                    description: `No hay música en la cola después de la actual ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });

        await queue.clear();

        inter.reply({
            embeds: [
                {
                    description: `La cola de reproducción acaba de ser borrada 🗑️`,
                    color: 0xFEE75C
                }
            ]
        });
    },
};