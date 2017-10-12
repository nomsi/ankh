import { RichEmbed as Embed } from 'discord.js';
import { CommandDecorators as c, Client, Command, Message } from 'yamdbf';

@c.aliases('invasion-timer', 'itimer')
@c.group('blizzard-utils')
export class InvasionTimer extends Command<Client> {
    public constructor() {
        super({
            name: 'invasions',
            desc: 'Current World of Warcraft invasion timer',
            usage: `<prefix>invasions [region]`
        });
    }

    public action(message: Message, args: string[]): void {

    }

    /**
     * US Invasion Timer
     * @todo Calculate timer needed from ms ticks
     * @returns {number}
     */
    private usTimer(): number {
        return 0;
    }

    /**
     * Oceanic Invasion Timer
     * @todo Calculate timer needed from ms ticks
     * @returns {number}
     */
    private oceanicTimer(): number {
        return 0;
    }

    /**
     * EU Invasion Timer
     * @returns {number}
     */
    private euTimer(): number {
        const euStartMili: number = 1491775200;
        const interval: number = 66600;
        const duration: number = 6 * 60 * 60;
        const now: number = Math.floor(new Date().getTime() / 1000);
        return (now - euStartMili) % interval;
    }

    private rsTimer(): number {
        return 0;
    }

    /**
     * Parses milliseconds to readable format, if invasion has
     * started, return true;
     * @todo Actually do it.
     * @returns {string|boolean}
     */
    private parseTime(): string|boolean {
        return true;
    }
}
