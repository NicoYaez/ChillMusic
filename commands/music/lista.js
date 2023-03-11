const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lista',
    description: 'Ver la lista de reproducción.',
    voiceChannel: true,

    execute({ client, inter }) {
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

        if (!queue.tracks[0]) 
        return inter.reply({
            embeds: [
                {
                    description: `No hay música en la cola después de la actual ${inter.member}... intentalo otra vez ? ❌ `,
                    color: 0xED4245
                }
            ]
        });

        const methods = ['', '🔁', '🔂'];

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} - **${track.requestedBy.username}**`);
        const songs = queue.tracks.length;
        const nextSongs = songs > 10 ? `.. **${songs - 10}** canciones mas...` : `En la Lista hay **${songs}** canciones...`;

        const embed = new EmbedBuilder()
        .setColor(0xFEE75C)
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Lista de Reproducción - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Reproduciendo actualmente **${queue.current.title}**\n\n${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()

        inter.reply({ embeds: [embed] });
    },
};