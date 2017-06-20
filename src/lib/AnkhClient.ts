import { Client, ListenerUtil, LogLevel, Logger, Util } from 'yamdbf';

const { on, once } = ListenerUtil;
const settings = require('../../settings.json');
const { version } = require('../../package.json');

export class AnkhClient extends Client {
    private readonly logger: Logger = Logger.instance();
    public settings: any;

    public constructor() {
        super({
            name: 'Ankh',
            token: settings.token,
            owner: settings.owner,
            version: version,
            unknownCommandError: false,
            statusText: 'Optimal.',
            readyText: 'Ready.',
            commandsDir: './dist/commands',
            ratelimit: '10/1m',
            logLevel: LogLevel.INFO
        });
        this.settings = settings;
    }

    @once('pause')
    private async _onPause(): Promise<any> {
        /**
         * @TODO database stuff here.
         */
        await this.setDefaultSetting('prefix', settings.prefix);
        this.emit('continue');
    }

    @on('clientReady')
    private _onClient(): void {
        this.logger.info('Ankh', 'Preparing...');
    }

    @once('clientReady')
    private _onceClientReady(): void {
        /**
         * @TODO init stuff here
         */
        this.logger.info('Ankh', 'Online.');
    }
}
