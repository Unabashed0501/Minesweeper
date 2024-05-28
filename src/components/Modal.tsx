import './css/Modal.css';
import React, { useEffect, useState } from "react";

interface ModalProps {
    restartGame: () => void;
    backToHome: () => void;
    win: boolean;
}

const Modal: React.FC<ModalProps> = ({ restartGame, backToHome, win }) => {
    const [render, setRender] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setRender(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const getResult = () => {
        return win ? "Win" : "Game Over";
    }

    const getBtnContent = () => {
        return win ? "New Game" : "Try Again";
    }

    return (
        <div className='modal' style={{ opacity: render ? 1 : 0 }}>
            <div className='modalWrapper'></div>
            <div className='modalContent'>
                <div className='modalResult'>{getResult()}</div>
                <div className='modalBtnWrapper'>
                    <div className='modalBtn' onClick={restartGame}>{getBtnContent()}</div>
                    <div className='modalBtn' onClick={backToHome}>Back to Home</div>
                </div>
            </div>
            <div className='modalWrapper'></div>
        </div>
    );
}

export default Modal;
