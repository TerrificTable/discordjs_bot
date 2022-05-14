const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./resources/config.json');
const fs = require('node:fs');

client.commands = new Collection();
const client = new Client({ intents: Intents.FLAGS.GUILDS });



// LOAD EVENTS AND COMMANDS
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}






client.login(token);