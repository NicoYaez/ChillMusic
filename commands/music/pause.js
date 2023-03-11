module.exports = {
    name: 'pause',
    description: 'Pausar la canción',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });

        if(queue.connection.paused) 
        return inter.reply({
            embeds: [
                {
                    description: `La canción está actualmente **Pausada**, ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        })

        const success = queue.setPaused(true);
        
        return inter.reply(success ?{
            embeds: [
                {
                    description: `⏸️ La canción **${queue.current.title}** ha sido **Pausada**.`,
                    color: 0x3498DB
                }
            ]
        } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);
    },
};
