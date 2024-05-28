import './MineSweeper.css';
import Board from '../components/Board';
import React, { useState } from 'react';
import HomePage from '../components/HomePage';

const MineSweeper: React.FC = () => {
    const [startGame, setStartGame] = useState<boolean>(false);
    const [mineNum, setMineNum] = useState<number>(10);
    const [boardSize, setBoardSize] = useState<number>(8);

    const startGameOnClick = () => {
        setStartGame(true);
    };

    const mineNumOnChange = (value: number) => {
        setMineNum(value);
    };

    const boardSizeOnChange = (value: number) => {
        setBoardSize(value);
    };

    const backToHomeOnClick = () => {
        setStartGame(false);
    };

    return (
        <div className='mineSweeper'>
            {startGame ? (
                <Board
                    boardSize={boardSize}
                    mineNum={mineNum}
                    backToHome={backToHomeOnClick}
                />
            ) : (
                <HomePage
                    startGameOnClick={startGameOnClick}
                    mineNumOnChange={mineNumOnChange}
                    boardSizeOnChange={boardSizeOnChange}
                    mineNum={mineNum}
                    boardSize={boardSize}
                />
            )}
        </div>
    );
};

export default MineSweeper;
