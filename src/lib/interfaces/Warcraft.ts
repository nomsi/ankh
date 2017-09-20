/* tslint:disable:interface-name */
export interface Boss {
    id: number;
    name: string;
    normalKills: number;
    normalTimestamp: any;
    heroicKills?: number;
    heroicTimestamp?: number;
    lfrKills?: number;
    lfrTimestamp?: number;
    mythicKills?: number;
    mythicTimestamp?: number;
}

export interface Raid {
    name: string;
    lfr: number;
    normal: number;
    heroic: number;
    mythic: number;
    id: number;
    bosses: Boss[];
}

export interface Progression {
    raids: Raid[];
}

export interface Warcraft {
    lastModified: number;
    name: string;
    realm: string;
    battlegroup: string;
    class: number;
    race: number;
    gender: number;
    level: number;
    achievementPoints: number;
    thumbnail: string;
    calcClass: string;
    faction: number;
    progression: Progression;
    totalHonorableKills: number;
}
