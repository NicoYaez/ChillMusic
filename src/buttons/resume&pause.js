module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) 
    return inter.reply({
        embeds: [
            {
                description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌`,
                color: 0xED4245
            }
        ]
    });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    
    return inter.reply(success ?{
        embeds: [
            {
                description: `▶️ La canción **${queue.current.title}** ha sido **Reanudada**.`,
                color: 0x3498DB
            }
        ]
    } : {
        embeds: [
            {
                description: `⏸️ La canción **${queue.current.title}** ha sido **Pausada**.`,
                color: 0x3498DB
            }
        ]
    });

}