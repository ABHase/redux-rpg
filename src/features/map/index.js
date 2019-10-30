import React from 'react'
import { connect } from 'react-redux'
import Chest from '../animatedTile'
import Tree from '../animatedTile/tree'
import {SPRITE_HEIGHT, SPRITE_WIDTH} from '../../config/constant'

import './styles.css'

function MapTile(props) {
  return <div 
  className={`tile ${getTileSprite(props.tile)}`}
  style={{
    height: SPRITE_HEIGHT,
    width: SPRITE_WIDTH,
  }}
  >
    {props.tile}
    {getTileSprite(props.tile)}
  </div>
}

function getTileSprite(type) {
  switch(type) {
    case 0:
      return 'grass'
    case 2:
      return <Chest />
    case 5:
      return 'rock'
    case 6:
      return <Tree />
    case 7:
      return 'rock2'
    default:
  }
}

function MapRow(props) {
  return <div className="row">
    {
      props.tiles.map( tile => <MapTile tile={tile} />)
    }
  </div>
}

function Map(props) {
  return (
    <div
    style={{
      position:'absolute',
      width: '4000px',
      height: '3600px',
      border: '4px solid white',
      fontSize: 0,
    }}      
    >

      {
        props.tiles.map( row => <MapRow tiles={row} />)
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles,
  }
}

export default connect(mapStateToProps)(Map)