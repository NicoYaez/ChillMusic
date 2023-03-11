const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'buscar',
    description: 'Buscar una canción.',
    voiceChannel: true,
    options: [
        {
            name: 'cancion',
            description: 'Nombre de la canción que quieres reproducir.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter, args }) {
        const song = inter.options.getString('cancion');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) 
        return inter.reply({
            embeds: [
                {
                    description: `No se han encontrado resultados ${inter.member}... intentalo otra vez ? ❌`,
                    color: 0xED4245
                }
            ]
        });


        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `Resultados para: ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setTimestamp()
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nEscribe la opción entre **1** al **${maxTracks.length}** o escribe **cancelar** ⬇️`);

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 30000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancelar') 
            return inter.channel.send({
                embeds: [
                    {
                        description: `Búsqueda cancelada ❌`,
                        color: 0xED4245
                    }
                ]
            }) && collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) 
            return inter.reply({
                embeds: [
                    {
                        description: `Respuesta no válida, pruebe con un valor entre **1** al **${maxTracks.length}** o escribe **cancelar**... intentalo otra vez ? ❌`,
                        color: 0xED4245
                    }
                ]
            });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guild.id);
                return inter.reply({
                    embeds: [
                        {
                            description: `No puedo unirme al canal de voz ${inter.member}... intentalo otra vez  ? ❌`,
                            color: 0xED4245
                        }
                    ]
                });
            }

            await inter.followUp(`Cargando su busqueda... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') 
            return inter.reply({
                embeds: [
                    {
                        description: `Se agotó el tiempo de búsqueda ${inter.member}... intentalo otra vez ? ❌`,
                        color: 0xED4245
                    }
                ]
            });
        });
    },
};