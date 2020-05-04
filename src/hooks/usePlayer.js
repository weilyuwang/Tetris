import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    // useCallback hook here is necessary
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, // reset the pos to top middle
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer((prevState) => ({
            ...prevState,
            pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
            collided: collided,
        }));
    };

    return [player, updatePlayerPos, resetPlayer];
};
