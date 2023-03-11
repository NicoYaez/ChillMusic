const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Habilitar o deshabilitar el bucle de la canción o toda la cola',
    voiceChannel: true,
    options: [
        {
        name: 'accion' ,
        description: 'Qué acción quieres realizar en el bucle',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Lista', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Canción', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
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

        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) 
                return inter.reply({
                    embeds: [
                        {
                            description: `Primero debe deshabilitar el modo de repetición **/loop Disable** ${inter.member}... intentalo otra vez ? ❌`,
                            color: 0xED4245
                        }
                    ]
                });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply(success ? {
                    embeds: [
                        {
                            description: `🔁 Modo de repetición **Habilitado** toda la lista de reproducción se repetirá.\n (Puede finalizar el ciclo con \`/loop disabled\`)`,
                            color: 0x3498DB
                        }
                    ]
                } : `Algo salió mal ${message.author}... intentalo otra vez ? ❌`);
                break
            }

            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply(success ? {
                    embeds: [
                        {
                            description: `🔁 Modo de repetición **Deshabilitado**.`,
                            color: 0x3498DB
                        }
                    ]
                } : `Algo salió mal ${message.author}... intentalo otra vez ? ❌`);
                break
            }

            case 'enable_loop_song': {
                if (queue.repeatMode === 2) 
                return inter.reply({
                    embeds: [
                        {
                            description: `Primero debe deshabilitar el modo de repetición **/loop Disable** ${inter.member}... intentalo otra vez ? ❌`,
                            color: 0xED4245
                        }
                    ]
                });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply(success ? {
                    embeds: [
                        {
                            description: `🔂 Modo de repetición **Habilitado**, la canción actual se repetirá.\n (Puede finalizar el ciclo con \`/loop disabled\`)`,
                            color: 0x3498DB
                        }
                    ]
                } : `Algo salió mal ${inter.member}... intentalo otra vez ? ❌`);
                break
            }
        }
       
    },
};