import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';
import * as request from 'snekfetch';

@c.aliases('g', 'google', 'search')
@c.info('Google search')
@c.group('ankh-info')
export class Google extends Command<Client> {
    public constructor() {
        super({
            name: 'google',
            desc: 'Google searching.',
            usage: '<prefix>g [args]'
        });
    }
    public async action(message: Message, args: string[]): Promise<void> {
        const msg: Message | Message[] = await message.channel.send('Searching..');
        return;
    }
}
