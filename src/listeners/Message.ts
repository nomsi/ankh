import { GuildStorage, Command, ListenerUtil as listener, Logger, logger } from 'yamdbf';
import { Collection, Message, MessageReaction, User, GuildMember, Channel } from 'discord.js';
import { AnkhClient } from '../lib/AnkhClient';

export class MessageEvent {
    private _client: AnkhClient;
    private readonly logger: Logger = Logger.instance();

    public constructor(client: AnkhClient) {
        this._client = client;
        listener.registerListeners(this._client, this);
    }

    @listener.on('message')
    private async _onMessage(message: Message): Promise<void> {
        if (message.channel.type !== 'text')
            return;
    }
}
