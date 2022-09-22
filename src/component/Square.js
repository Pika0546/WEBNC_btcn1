import React, { Component } from 'react'

export default class Square extends Component {

    render() {
        return (
            <button className="square" onClick={()=>{
                this.props.onClick(this.props.pos)
            }}>
                {this.props.value}
            </button>
        )
    }
}