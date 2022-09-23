import React, { Component } from 'react'

import Stack from "@mui/material/Stack"

import Square from './Square'

export default class Board extends Component {

    render() {
        const {board, winSquares} = this.props;
        return (
            <Stack 
                direction="column"
            >
                {board.map((row, rowIndex) => {
                    return (
                        <Stack direction="row" key={rowIndex}>
                            {row.map((value, colIndex) => {
                                return (
                                    <Square
                                        isWinSquare={winSquares && winSquares.find(item => item.row === rowIndex && item.col === colIndex)}
                                        pos={{
                                            row: rowIndex,
                                            col: colIndex,
                                        }}
                                        key={`${rowIndex}-${colIndex}`} 
                                        value={value}
                                        onClick={this.props.onSquareClick}
                                    />
                                )
                            })}
                        </Stack>
                    )
                })}
            </Stack>
        )
    }
}
