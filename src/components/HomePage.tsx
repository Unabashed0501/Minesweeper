import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

interface HomePageProps {
    startGameOnClick: () => void;
    mineNumOnChange: (value: number) => void;
    boardSizeOnChange: (value: number) => void;
    mineNum: number;
    boardSize: number;
}

const HomePage: React.FC<HomePageProps> = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize }) => {
    const [showPanel, setShowPanel] = useState(false);      
    const [error, setError] = useState(false); 
    const errorMessage = "ERROR: Mines number and board size are invalid!"
    
    useEffect(() => {
        checkMineNum();
    }, [mineNum, boardSize]);

    const showPanelChange = () => {
        setShowPanel(true);
    }

    const getPanelStyle = () => {
        return showPanel ? {} : { display: 'none' };
    }

    const getErrorStyle = () => {
        return error ? { color: '#880000' } : { display: 'none' };
    }

    const getColorStyle = () => {
        return { color: error ? '#880000' : '#0f0f4b' };
    }

    const checkMineNum = () => {
        setError(Number(mineNum) >= Number(boardSize) * Number(boardSize));
    }

    return (
        <div className='HomeWrapper'>
            <p className='title'>MineSweeper</p>
            <button className='btn' onClick={() => error ? alert(errorMessage) : startGameOnClick()}>Start Game</button>
            <div className='controlContainer'>
                <button className='btn' onClick={showPanelChange}>Difficulty Adjustment</button>
                <div className='controlWrapper' style={getPanelStyle()}>
                    <div className='error' style={getErrorStyle()}>{errorMessage}</div>
                    <div className='controlCol'>
                        <p className='controlTitle'>Mines Number</p>
                        <input type='range' min='2' max='30' defaultValue='10'
                            onChange={(e) => mineNumOnChange(Number(e.target.value))}>
                        </input>
                        <p className='controlNum' style={getColorStyle()}>{mineNum}</p>
                    </div>
                    <div className='controlCol'>
                        <p className='controlTitle'>Board Size (nxn)</p>
                        <input type='range' min='2' max='16' defaultValue='8'
                            onChange={(e) => boardSizeOnChange(Number(e.target.value))}>
                        </input>
                        <p className='controlNum' style={getColorStyle()}>{boardSize}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
