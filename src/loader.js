const { readdirSync } = require('fs');
const { Collection } = require('discord.js');


client.commands = new Collection();
CommandsArray = [];

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Cargando eventos...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> [Evento Cargado] ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Cargando comandos...`);

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        if (command.name && command.description) {
        CommandsArray.push(command);
        console.log(`-> [Comando Cargado] ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
        } else console.log(`[Comando Fallido]  ${command.name.toLowerCase()}`)
    };
});

client.on('ready', (client) => {
 if (client.config.app.global) client.application.commands.set(CommandsArray)
  else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray)
})