import { AnkhClient } from './AnkhClient';

/**
 * This constains different types of embed colors Ankh
 * uses in any command using a RichEmbed.
 */
export enum ColorConstant {
    'Default' = 0x000000,
    'Green' = 0x2ECC71,
    'DarkGreen' = 0x1F8B4C,
    'Purple' = 0x9B59B6,
    'DarkPurple' = 0x71368A,
    'Orange' = 0xE67E22,
    'Red' = 0xE74C3C,
    'DarkRed' = 0x992D22
}

/**
* This is embed colors associated with embeds and
* used color constants within Ankh commands.
*/
export enum EmbedCode {
    'Error' = ColorConstant.Red,
    'Warn' = ColorConstant.Orange,
    'Info' = ColorConstant.Green,
    'Profile' = ColorConstant.Purple
}
