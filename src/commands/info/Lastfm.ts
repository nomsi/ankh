import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';
import { RichEmbed } from 'discord.js';
import { EmojiCode, ErrorCodes, EmbedCode } from '../../lib/Util';

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
        await console.log(args);
        if (args) {
            const msg: Message = <Message> await message.channel.send(`${EmojiCode.Loading} Gathering your information...`);
            this.lastfm(args[0], (err: Error, data: any) => {
                if (err) {
                    msg.edit(`<@${message.author.id}>, ${data}`);
                } else {
                    const embed: RichEmbed = new RichEmbed()
                        .setTitle(`Last.fm - ${args[0]}`)
                        .addField(`Artist`, data.artist, true)
                        .addField(`Song`, data.song, true)
                        .addField(`Album`, data.album, true)
                        .setThumbnail(data.image)
                        .setColor(EmbedCode.Profile)
                        .setFooter('Click the link above to find out more information about what this user is listening to.')
                        .setURL(data.url);
                    msg.edit({ embed: embed });
                }
            });
        } else {
            message.channel.send('Missing username.');
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
            let tracks: any = JSON.parse(data.text).recenttracks.track;
            if (tracks[0]['@attr'] && tracks[0]['@attr']['nowplaying']) {
                callback(null, {
                    artist: tracks[0]['artist']['#text'],
                    song: tracks[0]['name'],
                    album: tracks[0]['album']['#text'],
                    image: tracks[0]['image'][4]['#text'],
                    url: tracks[0]['url']
                });
            } else {
                callback('ERROR', `that user isn\'t listening to anything! ${EmojiCode.SadLizard}`);
            }
        }).catch((err) => {
            console.log(`Something went wrong with command: Lastfm!\n${err.stack}`);
            callback('ERROR', ErrorCodes.ERROR_WENT_WRONG);
        });
    }
}
