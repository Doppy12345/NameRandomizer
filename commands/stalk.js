import {SlashCommandBuilder, Client, } from "discord.js"

export default {
    data: new SlashCommandBuilder()
    .setName('stalk')
    .setDescription("The user to watch corresponding mentions")
    .addStringOption(option => option
        .setName('letter')
        .setDescription("Starting Letter of  Your Name")
        .setRequired(true)
    ),
    /**
     * @param  {} interaction
     * @param {Client} client
     */
    async execute(interaction, client){
        await interaction.reply({content: "I'm watching you...", ephemeral: true})
        const letter = await interaction.options.getString('letter')
        const guildMemberId = interaction.member.user.id
        client.stalking[guildMemberId] = {member: interaction.member, startingLetter: letter}
    }
} 
    
