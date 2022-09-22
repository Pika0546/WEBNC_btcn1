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