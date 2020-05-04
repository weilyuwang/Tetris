import React, { useState } from "react";

import { createStage } from "../gameHelpers";

// styled components
import { StyledTetrisWrapper } from "./styles/StyledTetrisWrapper";
import { StyledTetris } from "./styles/StyledTetris";

// custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log("re-render");

    const movePlayer = (dir) => {
        updatePlayerPos({ x: dir, y: 0 });
    };

    const startGame = () => {
        // reset everything
        setStage(createStage());
        resetPlayer();
    };

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({ keyCode }) => {
        // extract keyCode prop from the event object
        if (!gameOver) {
            if (keyCode === 37) {
                // left
                movePlayer(-1);
            } else if (keyCode === 39) {
                // right
                movePlayer(1);
            } else if (keyCode === 40) {
                // down
                dropPlayer();
            }
        }
    };

    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={(event) => move(event)}
        >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    )}

                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
