import React from 'react'
import { connect } from 'react-redux'
import chest from './chest.png'
import animateTile from './animate'

function Chest(props) {
  return (
    <div
    style={{
      position: 'absolute',
      backgroundImage: `url('${chest}')`,
      backgroundPosition: props.spriteLocation,
      width: '200px',
      height: '360px',

    }}
    />
  )
}

function mapStateToProps(state) {
  return {
    ...state.chest,
  }
}

export default connect(mapStateToProps)(animateTile(Chest))