const { ActivityType } = require('discord.js')

module.exports = async (client) => {
    console.log(`Registrado en el cliente ${client.user.username}\n-> Listo en ${client.guilds.cache.size} Servidores para un total de ${client.users.cache.size} usuarios`);
    client.user.setActivity('/play', { type: ActivityType.Listening });
};