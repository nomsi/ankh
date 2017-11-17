import { CommandDecorators as c, Client, Command, Message, GuildStorage } from 'yamdbf';
import * as snekfetch from 'snekfetch';

@c.aliases('w', 'weather')
@c.info('Weather via wttr.in')
@c.group('ankh-info')
export class Weather extends Command<Client> {
    public constructor() {
        super({
            name: 'weather',
            desc: 'weather!',
            usage: '<prefix>w [location]'
        });
    }
    public async action(message: Message, args: string[]): Promise<void> {
        const _message: any | Message = await message.reply('Please wait..');
        if (!args[0]) {
            _message.edit('No location data given! Please feed me location data.');
        } else {
            const cb = '```'; // fkn lazy yo.
            snekfetch.get(`http://wttr.in/${args.join(' ').replace(' ', '%20')}?T0`).then((data) => {
                _message.edit(`${cb}\n${data.text}\n${cb}`);
            }).catch(console.error);
        }
    }
}
