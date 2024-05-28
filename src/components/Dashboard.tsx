import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css";

let timeIntervalId: NodeJS.Timeout;

interface DashboardProps {
    remainFlagNum: number;
    gameOver: boolean;
    win: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ remainFlagNum, gameOver, win }) => {
    const [time, setTime] = useState(0);
    const [sTime, setSTime] = useState(0);

    useEffect(() => {
        timeIntervalId = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(timeIntervalId);
    }, []);

    useEffect(() => {
        setTime(0);
        setSTime(time);
    }, [gameOver, win]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="dashBoard">
            <div id='dashBoard_col1'>
                <div className='dashBoard_col'>
                    <p className='icon'>🚩</p>
                    {remainFlagNum}
                </div>
            </div>
            <div id='dashBoard_col2'>
                <div className='dashBoard_col'>
                    <p className='icon'>⏰</p>
                    {formatTime(gameOver || win ? sTime : time)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
