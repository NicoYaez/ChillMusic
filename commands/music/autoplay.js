module.exports = {
    name: 'autoplay',
    description: 'Modo Autoplay.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({
            embeds: [
                {
                    description: `No hay música reproduciéndose actualmente ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        });

        const success = queue.setRepeatMode(3);

        return inter.reply(success ? {
            embeds: [
                {
                    description: `Modo \`AUTOPLAY\` **Habilitado**.\n\nModo \`AUTOPLAY\` solo funciona con **YOUTUBE**\n(Puede finalizar el ciclo con \`/loop disabled\`)`,
                    color: 0x3498DB
                }
            ]
        } : {
            embeds: [
                {
                    description: `Modo \`AUTOPLAY\` ya esta **Habilitado**.\n\nModo \`AUTOPLAY\` solo funciona con **YOUTUBE**\n(Puede finalizar el ciclo con \`/loop disabled\`)`,
                    color: 0x3498DB
                }
            ]
        });
    },
};