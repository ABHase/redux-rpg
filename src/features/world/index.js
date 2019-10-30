import React from "react";
import Map from "../map";
import Player from "../player";

import { tiles } from '../../data/maps/1'
import store from '../../config/store'
import Player2 from "../player2";

function World(props) {
  store.dispatch({type: 'ADD_TILES', payload: {
    tiles,
  }})

  return (
    <div
      style={{
        position: "relative",
        width: "4000px",
        height: "3600px",
        margin: "20px auto"
      }}
    >
      <Map />
      <Player />
      <Player2 />
    </div>
  );
}

export default World;
