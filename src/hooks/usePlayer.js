import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (tetromino, dir) => {
        // Make the rows to become columns (transpose)
        const rotatedTetromino = tetromino[0].map((_, colIndex) =>
            tetromino.map((row) => row[colIndex])
        );
        // Reverse each row to get a rotated tetromino
        if (dir > 0) {
            // clockwise rotation
            return rotatedTetromino.map((row) => row.reverse());
        } else {
            // anti-clockwise rotation
            return rotatedTetromino.reverse();
        }
    };

    const playerRotate = (stage, dir) => {
        // deep clone of player object
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer((prev) => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
};
