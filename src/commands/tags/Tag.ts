import { Collection, RichEmbed } from 'discord.js';
import { CommandDecorators as c, Client, Command, Message, GuildStorage } from 'yamdbf';

@c.guildOnly
@c.aliases('manage-tags', 'tag')
@c.group('tags')
export class Tag extends Command<Client> {
    public constructor() {
        super({
            name: 'tag',
            desc: 'manage tags',
            usage: `<prefix>tag [add|delete|update] <name> [details]`
        });
    }

    public async action(message: Message, args: string[]): Promise<void> {
        const action: string = args[0];
    }

    /**
     * Add new tag
     * @param {Message} message message object
     */
    private async add(message: Message): Promise<void> {

    }

    /**
     * Delete existing tag
     * @param {Message} message message object
     */
    private async delete(message: Message): Promise<void> {

    }

    /**
     * Update existing tag
     * @param {Message} message message object
     */
    private async update(message: Message): Promise<void> {

    }
}
