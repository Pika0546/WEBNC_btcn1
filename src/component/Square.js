import React, { Component } from 'react'

import Button from "@mui/material/Button"
import Zoom from "@mui/material/Zoom"

import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { SQUARE_SIZE } from '../config/contants'
export default class Square extends Component {

    render() {
        return (
            <Button 
            variant="outlined"
                onClick={()=>{
                    this.props.onClick(this.props.pos)
                }}
                sx={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    minWidth: SQUARE_SIZE,
                    border: "1px solid #d2d2d2",
                    ...(this.props.isWinSquare && {background: "yellow !important"})
                }}
                disableTouchRipple
            >
                {this.props.value === "X" && (
                    <Zoom in={true}>
                        <ClearIcon sx={{fontSize: "2rem", color: "red"}}/>
                    </Zoom>
                )}
                {this.props.value === "O" && (
                    <Zoom in={true}>
                        <RadioButtonUncheckedOutlinedIcon sx={{fontSize: "2rem", color: "blue"}}/>
                    </Zoom>
                )}
            </Button>
        )
    }
}
