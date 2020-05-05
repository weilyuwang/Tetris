import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

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

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log("re-render");

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        console.log("START GAME");
        // reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
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
            } else if (keyCode === 38) {
                // Up === Rotate clockwise
                playerRotate(stage, 1); // 1 === clockwise
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
