import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import { SQUARE_TO_WIN } from "./config/contants";

export const createMatrix = (row, col) => {
    const matrix = [];
    for(let i = 0; i < row; i ++){
        const row = [];
        for(let j = 0 ; j < col; j++){
            row.push("");
        }
        matrix.push(row)
    }
    return matrix
}

export const convertMoveListToMatrix = (moves, boardSize) => {
    const matrix = createMatrix(boardSize, boardSize)
    moves.forEach(move => {
        matrix[move.row][move.col] = move.value;
    });
    return matrix;
}

export const winLines = (size) => {
    const n = size;
    const lines = [];
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < n ; j++){
            const line1 = [];
            const line2 = [];
            const line3 = [];
            const line4 = [];
            for(let k = 0 ; k < SQUARE_TO_WIN; k ++){
                const row = {
                    row: i,
                    col: j + k,
                };
                if(row.col < n){
                    line1.push(row)
                }
                const col = {
                    row: i + k,
                    col: j,
                };
                if(col.row < n){
                    line2.push(col)
                }
                const diagonal1 = {
                    row: i + k,
                    col: j + k,
                }
                if(diagonal1.col < n && diagonal1.row < n){
                    line3.push(diagonal1)
                }
                const diagonal2 = {
                    row: i - k,
                    col: j + k,
                }
                if(diagonal2.col < n && diagonal2.row >= 0){
                    line4.push(diagonal2)
                }
            }
            line1.length === SQUARE_TO_WIN && lines.push(line1)
            line2.length === SQUARE_TO_WIN && lines.push(line2)
            line3.length === SQUARE_TO_WIN && lines.push(line3)
            line4.length === SQUARE_TO_WIN && lines.push(line4)
        }
    }
    return lines;
}

export const calculateWinner = (board) => {
    const n = board.length;
    const lines = winLines(n);
    for(let i = 0 ; i < lines.length; i++){
        let flag = true;
        for(let j = 0; j < SQUARE_TO_WIN - 1; j++){
            const {row, col} = lines[i][j];
            const {row: row2, col:  col2} = lines[i][j+1];
            if(!board[row][col] || board[row][col] !== board[row2][col2]){
                flag = false;
                break;
            }
        }
        if(flag){
            return lines[i];
        }
    }
    return null;
}

export const isEqualSquare = (square1, square2, checkValue) => {
    return square1.row === square2.row && square1.col === square2.col && (checkValue ? square1.value === square2.value : true);
}

export const keyToIcon = (key) => {
    if(key.toLowerCase() === 'x'){
        return <ClearIcon sx={{color: "red"}}></ClearIcon>
    }
    else if(key.toLowerCase() === 'o'){
        return <RadioButtonUncheckedOutlinedIcon sx={{color: "blue"}}></RadioButtonUncheckedOutlinedIcon>
    }
}