import { CommandInt } from "../interfaces/CommandInt";
import { SlashCommandBuilder } from "@discordjs/builders";
import { getCamperData } from "../modules/getCamperData";
const { MessageEmbed } = require('discord.js');

export const view:  CommandInt = {

    data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("Displays your lates 100 days of code check in."),

    run: async (interaction) => {

        await interaction.deferReply();
        const {user} = interaction;
        const targetCamper = await getCamperData(user.id);

        if(!targetCamper.day){
            await interaction.editReply({
            content: "You have not started the 100 days of Code Challenge. Use the `/100` command to do so."
        });
        return;
    }

    const viewEmbed = new MessageEmbed();
    viewEmbed.setTitle("My 100 Days of Code progress.")
    viewEmbed.setDescription(
        `Here is my 100 Days of Code progress. I last reported an update on:
        ${new Date(targetCamper.timestamp)
        .toLocaleDateString()}.` );
    viewEmbed.setAuthor({
        name: user.tag,
        iconUrl : user.displayAvatarURL(),
    });
        
    viewEmbed.addField("Round", targetCamper.round.toString(), true);
    viewEmbed.addField("Day", targetCamper.day.toString(), true);

    await interaction.editReply({embeds: [viewEmbed]});
}

}