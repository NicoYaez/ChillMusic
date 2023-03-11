const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'play',
    description: "Reproducir una canción!",
    voiceChannel: true,
    options: [
        {
            name: 'cancion',
            description: 'El nombre/url/playlist para reproducir.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }, args) {
	await inter.deferReply();
        const song = inter.options.getString('cancion');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });


        if (!res || !res.tracks.length) 
        return inter.editReply({
            embeds: [
                {
                    description: `No se han encontrado resultados ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: 300000,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: 300000,
            autoSelfDeaf: true
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);
            return inter.editReply({
                embeds: [
                    {
                        description: `No puedo unirme al canal de voz. ${inter.member}... intentalo otra vez ? ❌`,
                        color: 0xED4245
                    }
                ]
            });
        }

       await inter.editReply({ content:`Cargando tu ${res.playlist ? 'playlist' : 'canción'}... 🎧`});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
