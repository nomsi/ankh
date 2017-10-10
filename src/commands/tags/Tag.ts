import { Collection, RichEmbed } from 'discord.js';
import { CommandDecorators as c, Client, Command, Message, GuildStorage } from 'yamdbf';

@c.guildOnly
@c.aliases('manage-tags', 'tag')
@c.group('tags')
export class Tag extends Command<Client> {

    private storage: GuildStorage;

    public constructor() {
        super({
            name: 'tag',
            desc: 'manage tags',
            usage: `<prefix>tag [add|delete|update] <name> [details]`
        });
    }

    public async action(message: Message, args: string[]): Promise<void> {

        // Argument assignment and storage creaction
        const action: string = args[0];
        this.storage = message.guild.storage;

        // Create table 'guild_tags' if it doesn't exist in the guild
        // database.
        if (!await this.storage.exists('guild_tags')) {
            await this.storage.set('guild_tags', {});
        }

        /**
         * @todo add channel specific tag flag
         * action controller
         */
        switch (action) {
            case 'add':
                this.add(message, this.storage, args);
                break;
            case 'delete':
                this.delete(message, this.storage, args);
                break;
            case 'update':
                this.update(message, this.storage, args);
                break;
            default: break;
        }

    }

    /**
     * Add new tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async add(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (await _storage.exists(`tags.${data[1]}`)) {
            message.channel.send(`The tag already exists.`);
        } else {
            await _storage.set(`guild_tags.${data}`, data.slice(2).join(' '));
            message.channel.send(`Tag '${data[1]}' added`);
        }
    }

    /**
     * Delete existing tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async delete(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (!(await _storage.exists(`tags.${data[1]}`))) {
            message.channel.send('Tag doesn\'t exist');
        } else {
            await _storage.remove(`guild_tags.${data[1]}`);
            message.channel.send(`Tag removed.`);
        }
    }

    /**
     * Update existing tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async update(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (!(await _storage.exists(`tags.${data[1]}`))) {
            message.channel.send('Tag doesn\'t exist');
        } else {
            await _storage.set(`guild_tags.${data[1]}`, data.slice(2).join(' '));
            message.channel.send('Tag updated');
        }
    }
}
