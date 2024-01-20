import { NewGame, Range } from "./types";

export const DEFAULT_VARIANTS: number = 5;

export const DEFAULT_REPEATS: number = 1;

export const DEFAULT_BOTTLE_SIZE: number = 3;

export const DEFAULT_GAME_NAME: string = 'New Game';

export const RANGE_VARIANTS: Range = { min: 3, max: 10 };

export const RANGE_REPEATS: Range = { min: 1, max: 3 };

export const RANGE_BOTTLE_SIZE: Range = { min: 3, max: 5 };

export const BOTTLE_MAX: number = 90;

export const HAS_LS: boolean = !!(typeof window !== 'undefined' && window.localStorage);

export const LAST_GAME_LEVEL_LS = 'liquid-sort-last-game-level';

export const LEVELS: NewGame[] = [
    { name: 'Level 1', variants: 2, repeats: 1, bottleSize: 2 },
    { name: 'Level 2', variants: 3, repeats: 1, bottleSize: 2 },
    { name: 'Level 3', variants: 3, repeats: 1, bottleSize: 3 },
    { name: 'Level 4', variants: 3, repeats: 1, bottleSize: 4 },
    { name: 'Level 5', variants: 4, repeats: 1, bottleSize: 3 },
    { name: 'Level 6', variants: 5, repeats: 1, bottleSize: 3 },
    { name: 'Level 7', variants: 6, repeats: 1, bottleSize: 3 },
    { name: 'Level 8', variants: 4, repeats: 1, bottleSize: 4 },
    { name: 'Level 9', variants: 5, repeats: 1, bottleSize: 4 },
    { name: 'Level 10', variants: 6, repeats: 1, bottleSize: 4 },
    { name: 'Level 11', variants: 7, repeats: 1, bottleSize: 3 },
    { name: 'Level 12', variants: 8, repeats: 1, bottleSize: 3 },
    { name: 'Level 13', variants: 9, repeats: 1, bottleSize: 3 },
    { name: 'Level 14', variants: 4, repeats: 2, bottleSize: 3 },
    { name: 'Level 15', variants: 4, repeats: 2, bottleSize: 4 },
    { name: 'Level 16', variants: 5, repeats: 2, bottleSize: 3 },
    { name: 'Level 17', variants: 5, repeats: 2, bottleSize: 4 },
];

export const COLORS: string[] = [
    '', // unused, colors starts at 1
    '#D32F2F',
    '#536DFE',
    '#388E3C',
    '#FF9800',
    '#C2185B',
    '#448AFF',
    '#8BC34A',
    '#E64A19',
    '#03A9F4',
    '#CDDC39',
    '#795548',
    '#7B1FA2',
    '#00BCD4',
    '#E040FB',
    '#FFEB3B',
    '#9E9E9E',
    '#512DA8',
    '#009688',
    '#FFA000',
    '#607D8B',
];