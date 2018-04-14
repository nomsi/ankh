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
            const music: any = this.lastfm(args[0]);
            if (music.error) {
                msg.edit(`<@${message.author.id}>`, music.error);
            }  else {
                const embed: RichEmbed = new RichEmbed()
                    .setTitle(`Last.fm - ${args[0]}`)
                    .addField('Artist', music.author, true)
                    .addField('Song', music.song, true)
                    .addField('Album', music.album, true)
                    .setThumbnail(music.image)
                    .setColor(EmbedCode.Profile)
                    .setFooter('Click on the link above to find out more')
                    .setURL(music.url);
                msg.edit({ embed: embed });
            }
        } else {
            message.channel.send('Missing username.');
        }
    }

    private lastfm(username: string): any {
        const uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API}&format=json`;
        request.get(uri).then((data: request.Result) => {
            let tracks: any = JSON.parse(data.text).recenttracks.track;
            if (tracks[0]['@attr'] && tracks[0]['@attr']['nowplaying']) {
                return {
                    artist: tracks[0]['artist']['#text'],
                    song: tracks[0]['name'],
                    album: tracks[0]['album']['#text'],
                    image: tracks[0]['image'][3]['#text'],
                    url: tracks[0]['url']
                };
            } else {
                return { error: `that user is not listening to anything. ${EmojiCode.SadLizard}` };
            }
        }).catch((err: Error) => {
            console.log(err);
            return { error : ErrorCodes.ERROR_WENT_WRONG }
        });
        return {};
    }
}
