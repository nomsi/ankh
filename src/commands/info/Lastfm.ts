import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';
import { RichEmbed } from 'discord.js';
import * as request from 'snekfetch';

@c.aliases('lastfm', 'np', 'lfm')
@c.info('Last.fm command')
@c.group('ankh-info')
export class Lastfm extends Command<Client> {
    public constructor() {
        super({
            name: 'lastfm',
            desc: 'Gathers now player from last.fm api',
            usage: '<prefix>lastfm [username]'
        });
    }

    public action(message: Message, args: string[]): void {
        return;
    }

    /**
     * Gathers information from Last.fm API
     * @param {string} username
     * @returns {object} embed object
     */
    private lastfm(username: string): object {
        return {};
    }
}
