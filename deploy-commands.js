import { REST, Routes } from 'discord.js';
import { clientId, Token } from './config.js';
import stalk from "./commands/stalk.js"

const commands = [stalk.data.toJSON()];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(Token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();