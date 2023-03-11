const maxVol = client.config.opt.maxVol;
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

    const vol = Math.floor(queue.volume + 5)

    if (vol > maxVol ) 
    return inter.reply({embeds: [
        {
            description: `Ya no puedo subir mas el volumen ${inter.member}... intentalo otra vez ? ❌`,
            color: 0xED4245
        }
    ]})

    if (queue.volume === vol) 
        return inter.reply({embeds: [
            {
                description: `El volumen que quieres cambiar ya es el actual ${inter.member}... intentalo otra vez ? ❌`,
                color: 0xED4245
            }
        ]});

    const success = queue.setVolume(vol);

    return inter.reply(success ?{
        embeds: [
            {
                description: `El volumen ha sido modificado a **${vol}**/**${maxVol}**% 🔊`,
                color: 0xED4245
            }
        ]
    } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);

}