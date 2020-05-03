import { useState, useCallback } from "react";

import { randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromimo: randomTetromino().shape,
        collided: false,
    });

    // useCallback hook here is necessary
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, // reset the pos to top middle
            tetromimo: randomTetromino().shape,
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
