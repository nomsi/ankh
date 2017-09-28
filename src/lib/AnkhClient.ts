import { Client, ListenerUtil, LogLevel, Logger, Util, Providers } from 'yamdbf';

const { PostgresProvider } = Providers;
const { on, once } = ListenerUtil;
const { token, owner, prefix, db } = require('../../settings.json');
const { version } = require('../../package.json');

export class AnkhClient extends Client {

    private readonly logger: Logger = Logger.instance();
    private readonly postgres: any = PostgresProvider(db.postgres);
    public constructor() {
        super({
            token: token,
            owner: owner,
            unknownCommandError: false,
            provider: PostgresProvider(db.postgres),
            statusText: 'Optimal.',
            readyText: 'Ready.',
            commandsDir: './dist/commands',
            ratelimit: '10/1m',
            logLevel: LogLevel.DEBUG
        });
    }

    @once('pause')
    private async _onPause(): Promise<any> {
        await this.setDefaultSetting('prefix', prefix);
        this.emit('continue');
    }

    @once('clientReady')
    private _onceClientReady(): void {
        this.logger.info('Ankh', 'Online.');
    }

    @on('debug')
    private _onDebug(m: string): void {
        if (m.includes('Authenticated using token') || m.toLocaleLowerCase().includes('heartbeat')) return;
        this.logger.debug('Discord', m);
    }

    @on('clientReady')
    private _onClient(): void {
        this.logger.info('Ankh', 'Preparing...');
    }

}
