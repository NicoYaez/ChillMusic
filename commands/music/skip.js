module.exports = {
    name: 'skip',
    description: 'Saltar una canción.',
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

        const success = queue.skip();

        return inter.reply(success ?{
            embeds: [
                {
                    description: `⏭️ La canción **${queue.current.title}** ha sido saltada`,
                    color: 0x3498DB
                }
            ]
        } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);
    },
};