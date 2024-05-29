import './css/Board.css';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
// import { revealed } from '../utils/reveal';
// import createBoard from '../utils/createBoard';
import React, { useEffect, useState } from 'react';
import { Minesweeper } from '../model/Minesweeper';
import axios from 'axios';

interface BoardProps {
    boardSize: number;
    mineNum: number;
    backToHome: () => void;
}

interface CellDetail {
    value: number | '💣';       // To store the number of mines around the cell or '💣' if it's a mine.
    revealed: boolean;          // To store if the cell is revealed.
    x: number;
    y: number;
    flagged: boolean;           // To store if the cell is flagged.
}

const Board: React.FC<BoardProps> = ({ boardSize, mineNum, backToHome }) => {
    const newGame = new Minesweeper(boardSize, mineNum);
    // const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(newGame);
    const [board, setBoard] = useState<CellDetail[][]>([]);
    // const [nonMineCount, setNonMineCount] = useState<number>(0);        
    const [remainFlagNum, setRemainFlagNum] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [win, setWin] = useState<boolean>(false);

    useEffect(() => {
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/new-game', { boardSize: boardSize, mineNum: mineNum });
            setBoard(response.data.board);
            setRemainFlagNum(mineNum);
            setGameOver(false);
            setWin(false);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = async (e: React.MouseEvent, x: number, y: number) => {
        e.preventDefault();
        let newBoard = JSON.parse(JSON.stringify(board));
        // if (!minesweeper) return;
        console.log('updateFlag');
        // if (board[x][y].revealed) return;
        try {
            const response = await axios.post('http://localhost:8080/api/place-flag', { x, y });
            setBoard(response.data.board);
            setRemainFlagNum(response.data.remainFlagNum);
        } catch (error) {
            console.error('Error updating flag:', error);
        }
    };

    const revealCell = async (x: number, y: number) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        try {
            const response = await axios.post('http://localhost:8080/api/reveal-cell', { x, y });
            setBoard(response.data.board);
            setGameOver(response.data.gameOver);
            setWin(response.data.win);
        } catch (error) {
            console.error('Error revealing cell:', error);
        }
    };

    const getCellSize = () => {
        if(boardSize > 20){
            if(boardSize > 30){
                return "15px";
            }
            return "20px";
        }
        return "30px";
    }

    return (
        <div className='boardPage'>
            <div className='btnWrapper'>
                <div className='modalBtn' onClick={backToHome}>Back to Home</div>
            </div>
            <div className='boardWrapper'>
                <div className='boardContainer'>
                    <Dashboard
                        remainFlagNum={remainFlagNum}
                        gameOver={gameOver}
                        win={win}
                    />

                    {board.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} style={{ display: "flex" }}>
                                {row.map((col, colIdx) => {
                                    return (
                                        <Cell
                                            key={`${rowIdx}-${colIdx}`}
                                            rowIdx={rowIdx}
                                            colIdx={colIdx}
                                            detail={col}
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                            cellSize={getCellSize()}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {(gameOver || win) && (
                    <Modal
                        restartGame={restartGame}
                        backToHome={backToHome}
                        win={win}
                    />
                )}
            </div>
        </div>
    );
};

export default Board;
