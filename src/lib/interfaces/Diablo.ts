/* tslint:disable:interface-name */

export interface Kills {
    elites: number;
}

export interface Hero {
    id: number;
    name: string;
    class: string;
    gender: number;
    level: number;
    kills: Kills;
    paragonLevel: number;
    hardcore: boolean;
    seasonal: boolean;
    dead: boolean;
    lastupdated: number;
}

export interface Kills2 {
    monsters: number;
    elites: number;
    hardcoreMonsters: number;
}

export interface TimePlayed {
    barbarian: number;
    crusader: number;
    demonhunter: number;
    monk: number;
    necromancer: number;
    witchdoctor: number;
    wizard: number;
}

export interface Progression {
    act1: boolean;
    act2: boolean;
    act3: boolean;
    act4: boolean;
    act5: boolean;
}

export interface Blacksmith {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface Jeweler {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface Mystic {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface BlacksmithHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface JewelerHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface MysticHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface BlacksmithSeason {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface JewelerSeason {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface MysticSeason {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface BlacksmithSeasonHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface JewelerSeasonHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface MysticSeasonHardcore {
    slug: string;
    level: number;
    stepCurrent: number;
    stepMax: number;
}

export interface Kills3 {
    monsters: number;
    elites: number;
    hardcoreMonsters: number;
}

export interface TimePlayed2 {
    barbarian: number;
    crusader: number;
    demonhunter: number;
    monk: number;
    necromancer: number;
    witchdoctor: number;
    wizard: number;
}

export interface Progression2 {
    act1: boolean;
    act2: boolean;
    act3: boolean;
    act4: boolean;
    act5: boolean;
}

export interface Season11 {
    seasonId: number;
    paragonLevel: number;
    paragonLevelHardcore: number;
    kills: Kills3;
    timePlayed: TimePlayed2;
    highestHardcoreLevel: number;
    progression: Progression2;
}

export interface Kills4 {
    monsters: number;
    elites: number;
    hardcoreMonsters: number;
}

export interface TimePlayed3 {
    barbarian: number;
    crusader: number;
    demonhunter: number;
    monk: number;
    necromancer: number;
    witchdoctor: number;
    wizard: number;
}

export interface Progression3 {
    act1: boolean;
    act2: boolean;
    act3: boolean;
    act4: boolean;
    act5: boolean;
}

export interface Season10 {
    seasonId: number;
    paragonLevel: number;
    paragonLevelHardcore: number;
    kills: Kills4;
    timePlayed: TimePlayed3;
    highestHardcoreLevel: number;
    progression: Progression3;
}

export interface Kills5 {
    monsters: number;
    elites: number;
    hardcoreMonsters: number;
}

export interface TimePlayed4 {
    barbarian: number;
    crusader: number;
    demonhunter: number;
    monk: number;
    necromancer: number;
    witchdoctor: number;
    wizard: number;
}

export interface Progression4 {
    act1: boolean;
    act2: boolean;
    act3: boolean;
    act4: boolean;
    act5: boolean;
}

export interface Season0 {
    seasonId: number;
    paragonLevel: number;
    paragonLevelHardcore: number;
    kills: Kills5;
    timePlayed: TimePlayed4;
    highestHardcoreLevel: number;
    progression: Progression4;
}

export interface SeasonalProfiles {
    season11: Season11;
    season10: Season10;
    season0: Season0;
}

export interface RootObject {
    battleTag: string;
    paragonLevel: number;
    paragonLevelHardcore: number;
    paragonLevelSeason: number;
    paragonLevelSeasonHardcore: number;
    guildName: string;
    heroes: Hero[];
    lastHeroPlayed: number;
    lastUpdated: number;
    kills: Kills2;
    highestHardcoreLevel: number;
    timePlayed: TimePlayed;
    progression: Progression;
    fallenHeroes: any[];
    blacksmith: Blacksmith;
    jeweler: Jeweler;
    mystic: Mystic;
    blacksmithHardcore: BlacksmithHardcore;
    jewelerHardcore: JewelerHardcore;
    mysticHardcore: MysticHardcore;
    blacksmithSeason: BlacksmithSeason;
    jewelerSeason: JewelerSeason;
    mysticSeason: MysticSeason;
    blacksmithSeasonHardcore: BlacksmithSeasonHardcore;
    jewelerSeasonHardcore: JewelerSeasonHardcore;
    mysticSeasonHardcore: MysticSeasonHardcore;
    seasonalProfiles: SeasonalProfiles;
}
