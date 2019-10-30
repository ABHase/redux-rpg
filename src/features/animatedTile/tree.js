import React from 'react'
import tree from './tree.png'

function Tree() {
  return (
    <div
    style={{
      position: 'relative',
      bottom: '1080px',
      left: '-320px',
      flexShrink: '0',
      zIndex: 1,
      width:'800px',
      height: '1440px',
      backgroundImage: `url('${tree}')`,
    }}
    />
  )
}


export default Tree