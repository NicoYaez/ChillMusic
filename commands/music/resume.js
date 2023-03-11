module.exports = {
    name: 'resume',
    description: 'Reproducir la canción.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        });
        
        if(!queue.connection.paused) 
        return inter.reply({
            embeds: [
                {
                    description: `La canción está actualmente **Reanudada**, ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        })

        const success = queue.setPaused(false);
        
        return inter.reply(success ?{
            embeds: [
                {
                    description: `▶️ La canción **${queue.current.title}** ha sido **Reanudada**.`,
                    color: 0x3498DB
                }
            ]
        } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);
    },
};
