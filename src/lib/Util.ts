import { AnkhClient } from './AnkhClient';
import { Command } from 'yamdbf';
import { Message, MessageOptions } from 'discord.js';

export enum EmbedCode {
    'Default' = 0x000000,
    'Error' = 0xE74C3C,
    'Warn' = 0xE67E22,
    'Info' = 0x2ECC71,
    'Profile' = 0x9B59B6
}
