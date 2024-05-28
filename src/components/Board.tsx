import './css/Board.css';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
// import { revealed } from '../utils/reveal';
// import createBoard from '../utils/createBoard';
import React, { useEffect, useState } from 'react';
import { Minesweeper } from '../model/Minesweeper';

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
    const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(newGame);
    const [board, setBoard] = useState<CellDetail[][]>([]);                     
    // const [nonMineCount, setNonMineCount] = useState<number>(0);        
    // const [remainFlagNum, setRemainFlagNum] = useState<number>(0);      
    const [gameOver, setGameOver] = useState<boolean>(false);           
    const [win, setWin] = useState<boolean>(false);

    useEffect(() => {
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newGame = new Minesweeper(boardSize, mineNum);
        setMinesweeper(newGame);
        setBoard(newGame.createBoard().board)
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e: React.MouseEvent, x: number, y: number) => {
        e.preventDefault();
        let newBoard = JSON.parse(JSON.stringify(board));
        if (!minesweeper) return;
        let newFlagNum = minesweeper.getRemainFlagNum();

        if (!board[x][y].revealed && newFlagNum >= 0) {
            if(newFlagNum === 0) {
                if(board[x][y].flagged){
                    newBoard[x][y].flagged = false;
                    minesweeper.setRemainFlagNum(newFlagNum + 1);
                }
            }
            else{
                if (!board[x][y].flagged) {
                    newBoard[x][y].flagged = true;
                    minesweeper.setRemainFlagNum(newFlagNum - 1);
                } 
                else {
                    newBoard[x][y].flagged = false;
                    minesweeper.setRemainFlagNum(newFlagNum + 1);
                } 
            }
            
            setBoard(newBoard);
        }
    };

    const revealCell = (x: number, y: number) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        if (!minesweeper) return;
        let e = minesweeper.revealed(newBoard, x, y, minesweeper.getNonMineCount());
        newBoard = e.board;
        setBoard(newBoard);
        minesweeper!.setNonMineCount(e.newNonMinesCount);

        if (board[x][y].value === '💣') {
            setGameOver(true);
        }

        if (e.newNonMinesCount === 0) {
            setWin(true);
        }
    };

    return (
        <div className='boardPage'>
            <div className='boardWrapper'>
                <div className='boardContainer'>
                    <Dashboard 
                        remainFlagNum={minesweeper!.getRemainFlagNum()}
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
