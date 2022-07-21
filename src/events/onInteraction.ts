import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onInteraction = async (interaction: Interaction) => {

if(interaction.isContextMenuCommand()){

    for (const Command of CommandList){
        if (interaction.commandName === Command.data.name){
            await Command.run(interaction);
            break;
        }
    };

};

};