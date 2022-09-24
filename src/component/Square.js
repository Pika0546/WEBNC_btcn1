import React, { Component } from 'react'

import Button from "@mui/material/Button"
import Zoom from "@mui/material/Zoom"

import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { SQUARE_SIZE } from '../config/contants'
import { keyToIcon } from '../utilities';
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
                    ...(this.props.isWinSquare && {background: "yellow !important"}),
                    ...(!this.props.turn && {"&:hover":{
                        background: "#ff00000f",
                        borderColor: "#ff0000"
                    }})
                }}
                disableTouchRipple
            >
                {this.props.value && (
                    <Zoom in={true}>
                        {keyToIcon(this.props.value)}
                    </Zoom>
                )}
            </Button>
        )
    }
}
