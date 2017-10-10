import { CommandDecorators as c, Client, Command, Message, GuildStorage } from 'yamdbf';

@c.guildOnly
@c.aliases('me', 'pr')
@c.info('Ankh Profile System')
@c.group('ankh-profile')
export class Profile extends Command<Client> {

    private storage: GuildStorage;

    public constructor() {
        super({
            name: 'profile',
            desc: 'manage your profile, or view others',
            usage: `<prefix>profile [set|view|update|delete] <info>`
        });
    }

    public async action(message: Message, args: string[]): Promise<void> {
    }

    private async set(message: Message, _storage: GuildStorage, data: string[]) {
    }

    private async view(message: Message, _storage: GuildStorage, data: string[]) {
    }

    private async update(message: Message, _storage: GuildStorage, data: string[]) {
    }

    private async delete(message: Message, _storage: GuildStorage, data: string[]) {
    }

}
