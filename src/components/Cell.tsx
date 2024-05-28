import "./css/Cell.css";
import React from "react";

interface CellProps {
    rowIdx: number;
    colIdx: number;
    detail: {
        x: number;
        y: number;
        value: string | number;
        flagged: boolean;
        revealed: boolean;
    };
    updateFlag: (e: React.MouseEvent, x: number, y: number) => void;
    revealCell: (x: number, y: number) => void;
}

const Cell: React.FC<CellProps> = ({ rowIdx, colIdx, detail, updateFlag, revealCell }) => {
    const cellStyle: React.CSSProperties = {
        background: detail.revealed
            ? detail.value === '💣' 
                ? '#880000'
                : mineCheckPattern(detail.x, detail.y)
            : checkPattern(detail.x, detail.y),
        color: numColorCode(detail.value),
        border: detail.revealed ? "2px inset darkgrey" : "2px outset white",
    };

    const ID = `${rowIdx}-${colIdx}`;

    return (
        <div
            id={ID}
            className="cell"
            style={cellStyle}
            onClick={() => revealCell(detail.x, detail.y)}
            onContextMenu={(e) => updateFlag(e, detail.x, detail.y)}
        >
            {!detail.revealed && detail.flagged ? "🚩" : detail.revealed && detail.value !== 0 ? (detail.value === '💣' ? '💥' : detail.value) : ''}
        </div>
    );
};

export default Cell;

const mineCheckPattern = (x: number, y: number): string => {
    if (x % 2 === 0 && y % 2 === 0) return '#c0c0c0';
    else if (x % 2 === 0 && y % 2 !== 0) return '#bbbbbb';
    else if (x % 2 !== 0 && y % 2 === 0) return '#bbbbbb';
    else return '#c0c0c0';
};

const checkPattern = (x: number, y: number): string => {
    if (x % 2 === 0 && y % 2 === 0) return '#dddddd';
    else if (x % 2 === 0 && y % 2 !== 0) return '#d0d0d0';
    else if (x % 2 !== 0 && y % 2 === 0) return '#d0d0d0';
    else return '#dddddd';
};

const numColorCode = (num: string | number): string => {
    switch (num) {
        case 1:
            return '#0307de';
        case 2:
            return '#15760f';
        case 3:
            return '#dc1410';
        case 4:
            return '#02087e';
        case 5:
            return '#630501';
        case 6:
            return '#ec596c';
        case 7:
            return '#edf451';
        case 8:
            return '#56dddc';
        default:
            return '#000000';
    }
};
