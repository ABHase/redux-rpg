import React from 'react'
import { connect } from 'react-redux'

function Dialogue(props){
  return (
    <div
    style={{
      position: 'absolute',
      top: props.position[1],
      left: props.position[0],
      backgroundColor: 'brown',
      width: '800px',
      height: '720px',
    }}>
      <button
      onClick={() => props.dispatch({ type: 'DIALOGUE'})}
      style={{
        fontSize: 72,
      }}
      >X</button>
      <p style={{fontSize: 50}}>Now I can start and stop but I seem to take some time about stopping</p>
      </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.player2,
  }
}

export default connect(mapStateToProps)(Dialogue)