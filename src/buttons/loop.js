const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['Desabilitado', 'Canción', 'Lista'];

    if (!queue || !queue.playing) 
    return inter.reply({
        embeds: [
            {
                description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌ `,
                color: 0xED4245
            }
        ]
    });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)

    return inter.reply({
        embeds: [
            {
                description: `🔁 Modo de repetición **${methods[queue.repeatMode]}** `,
                color: 0x3498DB
            }
        ]
    })

}