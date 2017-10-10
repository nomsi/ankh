import { Client, ListenerUtil, LogLevel, Logger, Util, Providers } from 'yamdbf';
import { RedisClient as redis } from '../redis/RedisClient';

const { PostgresProvider } = Providers;
const { on, once } = ListenerUtil;
const { TOKEN, OWNERS, COMMAND_PREFIX, PGSQL_DB, REDIS_DB } = process.env;
const { version } = require('../../package.json');

export class AnkhClient extends Client {

    private readonly logger: Logger = Logger.instance();
    private readonly postgres: any = PostgresProvider(PGSQL_DB);
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
    private async _onPause(): Promise<any> {
        await this.setDefaultSetting('prefix', COMMAND_PREFIX);
        this.logger.info('Ankh', 'Preparing');
        this.emit('continue');
    }

    @once('clientReady')
    private _onceClientReady(): void {
        this.logger.info('Ankh', 'Online.');
        this.redis = new redis(REDIS_DB); /** @todo FINALLY. */
    }

    @on('debug')
    private _onDebug(m: string): void {
        if (m.includes('Authenticated using token') || m.toLocaleLowerCase().includes('heartbeat'))
            return;
        this.logger.debug('Discord', m);
    }

    @on('clientReady')
    private _onClient(): void {
        this.logger.info('Ankh', 'Ready!');
        this.user.setGame(`Optimal. @${this.user.tag} help`);
    }

}
