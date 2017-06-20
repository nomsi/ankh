import { AnkhClient } from './lib/AnkhClient';
const client: AnkhClient = new AnkhClient();

client.start();

process.on('unhandledRejection', (reason: string) => {
    console.error(reason);
});
