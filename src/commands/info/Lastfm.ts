import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';
import { EmojiCode, ErrorCodes } from '../../lib/Util';

import * as request from 'snekfetch';

const { LASTFM_API } = process.env;

@c.aliases('lastfm', 'np', 'lfm')
@c.info('Last.fm command')
@c.group('ankh-info')
@c.guildOnly
export class Lastfm extends Command<Client> {

    public constructor() {
        super({
            name: 'lastfm',
            desc: 'Gathers now player from last.fm api',
            usage: '<prefix>lastfm [username]'
        });
    }

    public async action(message: Message, args: string[]): Promise<void> {
        if (args[1]) {
            const msg: Message = <Message> await message.channel.send(`${EmojiCode.Loading} Gathering your information...`);
            this.lastfm(args[1], (data: any, err: Error) => {
                if (!err) {
                    msg.edit(`${EmojiCode.MusicNote} <@${message.author.username}, **${args[1]}** is listening to _${data}_`);
                } else {
                    msg.edit(`<@${message.author.id}>, ${ErrorCodes.ERROR_WENT_WRONG}`);
                }
            });
        }
    }

    /**
     * Gathers information from Last.fm API
     * I'm lazy so it's a callback. Screw you, nerds.
     * @param {string} username
     * @returns {void|string} data
     */
    private lastfm(username: string, callback: any): void {
        const uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API}&format=json`;
        request.get(uri).then((data: any) => {
            let tracks: any = data.recenttracks.track;
            if (tracks['@attr'] && tracks['@attr']['nowplaying']) {
                callback(null, tracks.name);
            } else {
                callback(null, `nothing... ${EmojiCode.SadCloudBlob}`);
            }
        }).catch((err) => {
            console.log(`Something went wrong with command: Lastfm! ${err.stack}`);
        });
    }
}
