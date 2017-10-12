import { Client, ListenerUtil, LogLevel, Logger, Util, Providers } from 'yamdbf';
import { RedisClient as redis } from '../redis/RedisClient';

const { PostgresProvider } = Providers;
const { on, once } = ListenerUtil;
const { TOKEN, OWNERS, COMMAND_PREFIX, PGSQL_DB, REDIS } = process.env;
const { version } = require('../../package.json');

export class AnkhClient extends Client {

    private readonly logger: Logger = Logger.instance();
    private redis: redis;

    public constructor() {
        super({
            token: TOKEN,
            owner: OWNERS.split('|'),
            unknownCommandError: false,
            provider: PostgresProvider(PGSQL_DB),
            statusText: 'Optimal.',
            readyText: 'Ready.',
            commandsDir: './dist/commands',
            ratelimit: '10/1m',
            logLevel: LogLevel.DEBUG
        });
    }

    @once('pause')
    private _onPause(): void {
        this.logger.info('Ankh', 'Preparing');
        this.emit('continue');
    }

    @once('clientReady')
    private _onceClientReady(): void {
        this.logger.info('Ankh', 'Online.');
        this.redis = new redis({
            ip: REDIS,
            channels: [ 'bot.*', 'web.*' ]
        });
    }

    @on('debug')
    private _onDebug(m: string): void {
        if (m.includes('Authenticated using token') || m.toLocaleLowerCase().includes('heartbeat'))
            return;
        this.logger.debug('Discord', m);
    }

    @on('error')
    private _onError(e: Error): void {
        this.logger.error('Discord', e.stack);
    }

    @on('reconnecting')
    private _onReconnecting(): void {
        this.logger.warn('Discord', 'Reconnecting...');
    }

    @on('clientReady')
    private async _onClient(): Promise<void> {
        await this.setDefaultSetting('prefix', COMMAND_PREFIX);
        this.logger.info('Ankh', 'Ready!');
        this.user.setGame(`Optimal. @${this.user.tag} help`);
    }

}
