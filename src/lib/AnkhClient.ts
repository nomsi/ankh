import { Client, ListenerUtil, LogLevel, Logger, Util } from 'yamdbf';

const { on, once } = ListenerUtil;
const { token, owner, prefix } = require('../../settings.json');
const { version } = require('../../package.json');

export class AnkhClient extends Client {

    private readonly logger: Logger = Logger.instance();
    public settings: any;

    public constructor() {
        super({
            token: token,
            owner: owner,
            unknownCommandError: false,
            statusText: 'Optimal.',
            readyText: 'Ready.',
            commandsDir: './dist/commands',
            ratelimit: '10/1m',
            logLevel: LogLevel.INFO
        });
    }

    @once('pause')
    private async _onPause(): Promise<any> {
        await this.setDefaultSetting('prefix', prefix);
        this.emit('continue');
    }

    @on('clientReady')
    private _onClient(): void {
        this.logger.info('Ankh', 'Preparing...');
    }

    @once('clientReady')
    private _onceClientReady(): void {
        this.logger.info('Ankh', 'Online.');
    }

}
