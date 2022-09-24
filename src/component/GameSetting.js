import React, { Component } from 'react'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { BOARD_SIZE_OPTIONS, DEFAULT_BOARD_SIZE } from '../config/contants';
export default class GameSetting extends Component {
    handleChange = (event) => {
        
        this.props.applySetting(event.target.value)
    }

    render() {
        return (
            <Paper
                variant='outlined'
                sx={{
                    padding: "0.5rem",
                }}
            >
                <p>Kích cỡ bảng:</p>
                <Select
                    defaultValue={DEFAULT_BOARD_SIZE}
                    fullWidth
                    size="small"
                    sx={{
                        margin: "0.5rem 0"
                    }}
                    onChange={this.handleChange}
                
                >

                    {BOARD_SIZE_OPTIONS.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
                <Typography variant="caption" display="block" gutterBottom>
                    *Thay đổi cài đặt sẽ khiến trận đấu bắt đầu lại từ đầu.
                </Typography>
            </Paper>
        )
    }
}
