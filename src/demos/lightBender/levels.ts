import { Rect } from "../../engine/math";

export interface ILevelData {
    tileSize: number;
    rows: number;
    cols: number;
    map: Array<Array<string>>;
    startTile: [number, number];
    zones: Rect[];
}

export const levels: ILevelData[] = [
    // ========================================================================
    // LEVEL 1
    // ========================================================================
    {
        tileSize: 55,
        rows: 8,
        cols: 8,
        startTile: [6, 4],
        map:  [
            [`0000`, `0000`, `0000`, `1424`, `0000`, `0000`, `0000`, `0000`],
            [`0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0001`, `0000`, `0000`],
            [`1325`, `0000`, `0001`, `0001`, `0001`, `0001`, `0000`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0001`, `0001`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0103`, `0000`, `0000`],
            [`0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`],
            [`0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`]
        ],
        zones: [
            new Rect(2, 2, 4, 4)
        ]
    },
    // ========================================================================
    // LEVEL 2
    // ========================================================================
    {
        tileSize: 55,
        rows: 8,
        cols: 8,
        startTile: [6, 4],
        map:  [
            [`0000`, `2324`, `0000`, `0000`, `1424`, `0000`, `0000`, `0000`],
            [`0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0001`, `0000`, `0000`],
            [`1325`, `0000`, `0001`, `0001`, `0001`, `0001`, `0000`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0001`, `0001`, `0000`],
            [`0000`, `0000`, `0001`, `0001`, `0001`, `0103`, `0000`, `0000`],
            [`0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`],
            [`0000`, `2000`, `0000`, `0000`, `0000`, `0000`, `0000`, `0000`]
        ],
        zones: [
            new Rect(2, 2, 4, 4)
        ]
    },
]