import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './sprite_shet_progress2.png'
import handleMovement from './movement'

function Player(props) {
  return (
    <div
    style={{
      position: 'absolute',
      top: props.position[1],
      left: props.position[0],
      backgroundImage: `url('${walkSprite}')`,
      backgroundPosition: props.spriteLocation,
      width: '200px',
      height: '360px',

    }}
    />
  )
}

function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

export default connect(mapStateToProps)(handleMovement(Player))