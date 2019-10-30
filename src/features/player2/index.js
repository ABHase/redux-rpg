import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './sprite_shet_progress2.png'
import handleMovement from './movement'
import Dialogue from './dialogue'

function Player2(props) {
  return (
    <div>
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
    { props.dialogue ? <Dialogue /> : null }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.player2,
  }
}

export default connect(mapStateToProps)(handleMovement(Player2))