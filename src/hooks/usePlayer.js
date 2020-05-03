import { useState } from "react";

import { randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromimo: randomTetromino().shape,
        collided: false,
    });

    return [player];
};
