import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';
import { RichEmbed } from 'discord.js';
import { EmojiCode } from '../../lib/Util';

import * as cheerio from 'cheerio';
import * as request from 'snekfetch';

@c.aliases('yt-search', 'yt', 'youtube')
@c.info('YouTube search')
@c.group('ankh-info')
export class Youtube extends Command<Client> {
    public constructor() {
        super({
            name: 'youtube',
            desc: 'Search YouTube for videos!',
            usage: '<prefix>youtube [args]'
        });
    }

    public async action(message: Message, args: string[]): Promise<void> {
        if (args[0]) {
            const msg: Message = <Message> await message.channel.send(`${EmojiCode.Loading} Gathering your information...`);
            this.search(args.join(' '), msg);
        } else {
            message.reply('No argument was given for the command');
        }
    }

    private search(args: string, message: Message): any|object {
        const embed: RichEmbed = new RichEmbed()
            .setTitle('YouTube Search Results')
            .setDescription(`Search results for **${args}**`);

        request.get(`https://youtube.com/results?search_query=${args}`).then((data: any) => {
            const $: CheerioAPI | CheerioStatic = cheerio.load(data);
            let videos: Cheerio = $('.yt-lockup-video');
            for (let i: number = 0; i <= 5; i++) {
                const uri: Cheerio | string = $(videos[i])
                    .find('.yt-uix-sessionlink')
                    .attr('href');

                if (!uri.startsWith('/watch'))
                    return;

                embed.addField(`${$(videos[i]).find('yt.lockup-title-e').text()}`, `https://youtube.com/${uri}`);
            }
        }).then(() => {
            message.edit({ embed: embed });
        }).catch((e: Error) => {
            message.edit(`Result fetch failed`);
            console.log(e);
        });
    }
}
