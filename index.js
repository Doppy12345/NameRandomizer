import {Client, Events, GatewayIntentBits} from "discord.js"
import stalk from "./commands/stalk.js"
import {Token} from "./config.js"
import { genName } from "./nameGen.js";

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds]})


client.commands = {}
client.stalking = {}



client.commands[stalk.data.name] = stalk

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands[interaction.commandName]

    if (!command) {
        console.error(`No matching command was found with name ${interaction.commandName}`)
        return
    }
    try{
        await command.execute(interaction, client)
    } catch (error){
        console.error(error)
        await interaction.reply({content: 'There was an error with that command', ephemeral: true})
    }
})




client.on(Events.MessageCreate, async (message) => {
    console.log(client.stalking)
    console.log("new Message")
    try {
        for (let victim in client.stalking){
            if (message.mentions.has(client.stalking[victim].member)){
                console.log(client.stalking[victim].member)
                let newName = await genName(client.stalking[victim].startingLetter, 'male')
                return client.stalking[victim].member.setNickname(newName)
            }
        }
    } catch (error) {
        console.error(error)
    }

})

client.login(Token)