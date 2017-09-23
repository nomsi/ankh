import * as Sequelize from 'sequelize';
import { Logger } from 'yamdbf';

export class Database {

    private db: any;
    private readonly logger: Logger = Logger.instance();

    public constructor(creds: string) {
        this.db = new Sequelize(creds, {
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 10,
                min: 1
            },
            dialectOptions: { keepAlive: true }
        });
    }

    public static get db(): any {
        return this.db;
    }

    public init(): Promise<any> {
        return this.db.authenticate()
            .then((): Promise<void> => this.logger.info('postgres', 'Connection established successfully.'))
            .then((): Promise<void> => this.logger.info('postgres', 'Syncing...'))
            .then((): void => {
                this.db.sync()
                    .then((): void => {
                        this.logger.info('postgres', 'Sync successful!');
                    })
                    .catch((err: Error): void => {
                        this.logger.error('postgres', `Sync unsuccessful: ${err}`);
                    });
            }).catch((err: Error): void => {
                this.logger.error('postgres', `Error connecting to database: ${err}`);
            });
    }
}
