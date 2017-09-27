import * as Sequelize from 'sequelize';
import { Logger } from 'yamdbf';

const { db } = require('../../settings.json');

export class Database {

    private db: Sequelize.Sequelize = new Sequelize(db.postgres, { logging: false });
    private readonly logger: Logger = Logger.instance();

    public static get db(): Sequelize.Sequelize {
        return this.db;
    }

    public init(): void {
        this.db.authenticate()
            .then((): Promise<void> => this.logger.info('postgres', 'Connection established successfully.'))
            .then((): Promise<void> => this.logger.info('postgres', 'Syncing...'))
            .then((): void => { this.db.sync(); })
            .catch((err: Sequelize.ConnectionError): void => {
                this.logger.error('postgres', `Error connecting to database: ${err}`);
            });
    }

}
