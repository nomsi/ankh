import { RedisClient as client, Multi, createClient as CreateClient } from 'redis';
import { promisifyAll as PromiseAll } from 'tsubaki';
import { Logger } from 'yamdbf';

PromiseAll(client.prototype);
PromiseAll(Multi.prototype);
PromiseAll(client.prototype.psubscribe);

export class RedisClient {

    private host: string;
    private channels: string[];
    private redis: client;
    private readonly logger: Logger = Logger.instance();

    public constructor(config: any) {
        this.host = config.ip;
        this.channels = config.channels;

        this.redis = new client({
            host: this.host,
            port: 6379
        });
    }

    /**
     * redisdb
     * @description public getter for the redis client
     */
    public get redisdb(): client {
        return this.redis;
    }

    /**
     * init
     * @description Initiate redis database connection and send message to services that the bot is alive.
     */
    public init(): void {
        this.redis.on('error', (error: Error): void => {
            this.logger.error('redis', `An error occured: ${error}`);
        }).on('reconnecting', (): void => {
            this.logger.debug('redis', 'Reconnecting.');
        }).on('ready', (): void => {
            this.logger.debug('redis', 'Ready! Events queued.');
        }).on('psubscribe', (p: string, c: number): void => {
            this.logger.debug('redis', `Subscribed successfully to ${c} channels.`);
        }).on('end', (): void => {
            this.logger.debug('redis', 'Connection interrupted. Perhaps the server shutdown?');
        });

        this.redis.subscribe('bot.status');
        this.redis.publish('bot.status', 'true');

        this.redis.psubscribe(this.channels);
    }

}
