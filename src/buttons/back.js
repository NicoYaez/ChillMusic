module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) 
    return inter.reply({
        embeds: [
            {
                description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌ `,
                color: 0xED4245
            }
        ]
    });

    if (!queue.previousTracks[1]) 
    return inter.reply({
        embeds: [
            {
                description: `No se escuchaba música antes ${inter.member}... intentalo otra vez ? ❌ `,
                color: 0xED4245
            }
        ]
    });

    await queue.back();

    inter.reply({
        embeds: [
            {
                description: `⏮️ Reproduciendo la canción **Anterior**.`,
                color: 0x3498DB
            }
        ]
    });
}
