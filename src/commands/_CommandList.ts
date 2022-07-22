import { CommandInt } from "../interfaces/CommandInt";
import { edit } from "./edit";
import { oneHundred } from "./oneHundred";
import { view } from "./view";
import { help } from "./help";

export const CommandList: CommandInt[] = [oneHundred, view, edit, help];
