import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {

    render() {
        const {board} = this.props;
        return (
            <div>
                {board.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="board-row">
                            {row.map((value, colIndex) => {
                                return (
                                    <Square
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
                        </div>
                    )
                })}
            </div>
        )
    }
}