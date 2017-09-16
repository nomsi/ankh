import { AnkhClient } from './lib/AnkhClient';
const client: AnkhClient = new AnkhClient();
client.start();
client.on('disconnect', (): void => process.exit(100));
process.on('unhandledRejection', (reason: string): void => {
    console.error(reason);
});
