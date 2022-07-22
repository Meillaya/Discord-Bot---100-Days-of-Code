import { CommandInt } from "../interfaces/CommandInt";
import { SlashCommandBuilder } from "@discordjs/builders";
const { MessageEmbed } = require('discord.js');

export const help:  CommandInt = {

    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information on using the bot."),

    run: async (interaction) => {
    await interaction.deferReply();

    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("100 Days of Code Bot!")
    helpEmbed.setDescription("This discord bot is designed to assist with tracking and sharing your 100 Days of Code progress." );
    
    helpEmbed.addField(
        "Create today's update",
        "Use the `/100` command to create your update for today. The `message` will be displayed in your embed." 
    )

    helpEmbed.addField(
        "Edit today's update",
        "Did you notice a typo in your embed? If so, right click it and copy the ID (enable developer mode for this), then use the `/edit` command to update the embed with a new message."
    )
    helpEmbed.addField(
        "Show your progress",
        "To view your progress in the challenge, and the day you last checked in, use `/view`."
    )

    helpEmbed.setFooter({ text: `Version ${process.env.npm_package_version}` });
    await interaction.editReply({embeds: [helpEmbed]});
    return;
    }
};