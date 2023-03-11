const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Error emitido desde la cola ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitido desde la conexión ${error.message}`);
});

player.on('botDisconnect', (queue) => {
    if(queue.npmessage) {
        queue.npmessage.delete().catch(error=> {});
    }

    queue.metadata.send({
        embeds: [
            {
                description: `Fui desconectado manualmente del canal de voz, borrando la cola.... ❌`,
                color: 0xED4245
            }
        ]
    });

    const embed = new EmbedBuilder()
    .setColor(0xBCC0C0)
    .setDescription(`Gracias por Utilizar **Chill Music**.`)
    .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
    queue.metadata.send({ embeds: [embed]});
});

//Solucion error ocurrido hace una semana.
player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});

player.on('trackStart', (queue, track) => {
    if(queue.npmessage) {
        queue.npmessage.delete().catch(error=> {});
    }

    if (!client.config.opt.loopMessage && queue.repeatMode !== 0 && queue.repeatMode !== 3 ) return;
    const embed = new EmbedBuilder()
    .setColor(0x57F287)
    .setTitle(`**${track.title}**`)
    .setThumbnail(`${track.thumbnail}`)
    .setDescription(`Autor **${track.author}**\nDuración **${track?.duration ? track.duration : "N/A"}**\nSolicitada por ${track.requestedBy}`);

    const back = new ButtonBuilder()
    .setLabel('⏮️')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Secondary')

    const skip = new ButtonBuilder()
    .setLabel('⏭️')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Secondary')

    const resumepause = new ButtonBuilder()
    .setLabel('⏯️')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Secondary')

    const loop = new ButtonBuilder()
    .setLabel('🔁')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const stop = new ButtonBuilder()
    .setLabel('Desconectar')
    .setCustomId(JSON.stringify({ffb: 'stop'}))
    .setStyle('Danger')

    const shuffle = new ButtonBuilder()
    .setLabel('🔀')
    .setCustomId(JSON.stringify({ffb: 'shuffle'}))
    .setStyle('Secondary')

    const volumeup = new ButtonBuilder()
    .setLabel('🔊')
    .setCustomId(JSON.stringify({ffb: 'volumeup'}))
    .setStyle('Secondary')

    const volumedown = new ButtonBuilder()
    .setLabel('🔉')
    .setCustomId(JSON.stringify({ffb: 'volumedown'}))
    .setStyle('Secondary')

    const rw = new ActionRowBuilder().addComponents(back, resumepause, skip, stop)
    const rw2 = new ActionRowBuilder().addComponents(volumeup, shuffle, loop, volumedown)
    
    queue.metadata.send({ embeds: [embed], components: [rw, rw2] }).then((msg) => {
        queue.npmessage = msg;
    });
});

player.on('channelEmpty', (queue) => {
    if(queue.npmessage) {
        queue.npmessage.delete().catch(error=> {});
    }   

    queue.metadata.send({
        embeds: [
            {
                description: `Nadie está en el canal de voz, saliendo del canal de voz.... ❌`,
                color: 0xED4245
            }
        ]
    });

    const embed = new EmbedBuilder()
    .setColor(0xBCC0C0)
    .setDescription(`Gracias por Utilizar **Chill Music**.`)
    .setImage('https://cdn.discordapp.com/attachments/639904843888197674/1083906637049385040/Sin_titulo-3_Mesa_de_trabajo_1.jpg')
    queue.metadata.send({ embeds: [embed]});
});

player.on("trackEnd", (queue, track) => {
    if(queue.npmessage) {
        queue.npmessage.delete().catch(error=> {});
    }       
});

player.on('queueEnd', (queue) => {
    if(queue.npmessage) {
        queue.npmessage.delete().catch(error=> {});
    }   
    queue.metadata.send({
        embeds: [
            {
                description: `Ya no quedan canciones en la lista de reproducción  ❌`,
                color: 0xED4245
            }
        ]
    });

});

player.on('trackAdd', (queue, track) => {
    const embed = new EmbedBuilder()
    .setColor(0x57F287)
    .setDescription(`Se Agrego **[${track.title}](${track.url})** a la lista.\n`)

    queue.metadata.send({ embeds: [embed]})
});

player.on("tracksAdd", (queue, tracks) => {
    
    const embed = new EmbedBuilder()
    .setColor(0x57F287)
    .setDescription(`Se agregaron **${tracks.length}** canciones desde [${tracks[0].playlist.title}](${tracks[0].playlist.url})\n`)

    queue.metadata.send({ embeds: [embed]})
});
