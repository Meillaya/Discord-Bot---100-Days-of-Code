import { CommandInt } from "../interfaces/CommandInt";
import { SlashCommandBuilder } from "@discordjs/builders";

export const edit:  CommandInt = {
    
    data: new SlashCommandBuilder()
        .setName("edit")
        .setDescription("Edit a previous 100 days of code post.")
        .addStringOption((option) =>
            option
                .setName("embed-id")
                .setDescription("ID of the message to edit.")
                .setRequired(true)
            )
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to go in your 100 Days of Code update.")
                .setRequired(true)
            ), 

    run: async (interaction) => {

        await interaction.deferReply();
        const {user, channel} = interaction;
        const text = (<any>interaction).options.getString("message", true);
        const targetId = (<any>interaction).options.getString("embed-id", true);

        if(!channel){
            await interaction.editReply({
            content: "Missing channel parameter."
        });
        return;
    }

        const targetMessage = await channel.messages.fetch(targetId);

        if(!targetMessage){
            await interaction.editReply({
                content: "That does not appear to be a valid message I. Use this comman in the same channel as the message."
            });
        return;
        }
        
        const targetEmbed = targetMessage.embeds[0];

        if(targetEmbed.author?.name !== user.username + "#" + user.discriminator){
            await interaction.editReply({
                content: "That does not appear to be your 100 Days of Code post. You cannot edit it."
            });
        return;
        }
        
        targetEmbed.setDescription(text);

        await targetMessage.edit({embeds: [targetEmbed]})
        await interaction.editReply({content: "Updated!"})


    }
}