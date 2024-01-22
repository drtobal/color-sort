import { NewGame, Range } from "./types";

/** default amount of color variants */
export const DEFAULT_VARIANTS: number = 5;

/** default number of repeat of each color */
export const DEFAULT_REPEATS: number = 1;

/** default bottle size */
export const DEFAULT_BOTTLE_SIZE: number = 3;

/** default game name */
export const DEFAULT_GAME_NAME: string = 'New Game';

/** currently accepted number of variants */
export const RANGE_VARIANTS: Range = { min: 3, max: 10 };

/** currently accepted number of repeats */
export const RANGE_REPEATS: Range = { min: 1, max: 3 };

/** currently accepted number of bottle size */
export const RANGE_BOTTLE_SIZE: Range = { min: 3, max: 5 };

/** check if the app has localstorage */
export const HAS_LS: boolean = !!(typeof window !== 'undefined' && window.localStorage);

/** name of the slot of localstorage to save last game name */
export const LAST_GAME_LEVEL_LS = 'color-sort-last-game-level';

/** rem converter to pixels */
export const REM_PX = 16;

/** bottle with, is the same of color width and height */
export const BOTTLE_WIDTH = 1.5;

/** animation function */
export const DECELERATION_CURVE_TIMING_FUNCTION = 'cubic-bezier(0, 0, 0.2, 1)';

/** animation function */
export const STANDARD_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 0.2, 1)';

/** animation function */
export const ACCELERATION_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 1, 1)';

/** animation function */
export const SHARP_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 0.6, 1)';

/** animation timing */
export const TRANSITION_DURATION_COMPLEX = 375;

/** animation timing */
export const TRANSITION_DURATION_ENTERING = 225;

/** animation timing */
export const TRANSITION_DURATION_EXITING = 195;

/** animation timing */
export const TRANSITION_ENTER = `${TRANSITION_DURATION_ENTERING}ms ${DECELERATION_CURVE_TIMING_FUNCTION}`;

/** animation timing */
export const TRANSITION_EXIT_PERMANENT = `${TRANSITION_DURATION_EXITING}ms ${ACCELERATION_CURVE_TIMING_FUNCTION}`;

/** level list configuration, in the future this could be an algorithm to generate unlimited levels */
export const LEVELS: NewGame[] = [
    { name: 'Level 1', variants: 3, repeats: 1, bottleSize: 2 },
    { name: 'Level 2', variants: 3, repeats: 1, bottleSize: 3 },
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
    { name: 'Level 17', variants: 6, repeats: 1, bottleSize: 4 },
    { name: 'Level 18', variants: 7, repeats: 1, bottleSize: 4 },
    { name: 'Level 19', variants: 8, repeats: 1, bottleSize: 4 },
    { name: 'Level 20', variants: 9, repeats: 1, bottleSize: 4 },
];

/** array of colors used as background */
export const COLORS: string[] = [
    '', // unused, colors starts at 1
    'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    '#D32F2F',
    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    '#536DFE',
    '#388E3C',
    'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    '#FF9800',
    'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    '#C2185B',
    '#448AFF',
    '#8BC34A',
];