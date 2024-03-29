export type Bottle = number[];

export type AnyObject = {
    [prop: string]: any;
};

export type MoveColorAction = {
    source: Bottle;
    target: Bottle;
    moved: boolean;
};

export type BottleDragData = {
    index: number;
    bottle: Bottle;
};

export type NewGame = {
    variants: number;
    repeats: number;
    bottleSize: number;
    name: string;
};

export type Range = {
    min: number;
    max: number;
};
