import store from "../../config/store";
import {
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  MAP_WIDTH,
  MAP_HEIGHT
} from "../../config/constant";

export default function handleMovement(player) {
  
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_WIDTH, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_WIDTH, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_HEIGHT];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_HEIGHT];
      default:
    }
  }

  function observerBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_WIDTH &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_HEIGHT)
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_HEIGHT;
    const x = newPos[0] / SPRITE_WIDTH;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function interact() {
    const tiles = store.getState().map.tiles;
    const facing = store.getState().player.facingPosition;
    const otherPlayerPos = store.getState().player2.position;
    const otherPlayerY = otherPlayerPos[1];
    const otherPlayerX = otherPlayerPos[0];

    let y = facing[1] / SPRITE_HEIGHT;
    if (y < 0) y = 0;
    let x = facing[0] / SPRITE_WIDTH;
    if (x < 0) x = 0;
    const interactTile = tiles[y][x];
    if (facing[0] === otherPlayerX && facing[1] === otherPlayerY) {
      store.dispatch({
        type: "ATTACK_PLAYER",
        payload: {
          dialogue: true,
        }
      })}  else if (interactTile === 2){animateTile()}
      else return
  }

  // function delayedDispatch(direction, newPos) {
  //   setTimeout(() => 
  //   {
  //   const walkIndex = getWalkIndex();
  //   store.dispatch({
  //     type: "MOVE_PLAYER",
  //     payload: {
  //       position: newPos,
  //       direction,
  //       walkIndex,
  //       spriteLocation: getSpriteLocation(direction, walkIndex),
  //     }
  //   });
  // }
  //   , 1000);}


  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      }
    });
  }

  function dispatchAttack() {
    const health = getHealth();
    store.dispatch({
      type: "ATTACK_PLAYER",
      payload: {
        health
      }
    });
  }

  function getHealth() {
    const health = store.getState().player2.health;
    return health - 1;
  }

  function compareLocations(newPos) {
    const otherPlayerPos = store.getState().player2.position;
    const otherPlayerY = otherPlayerPos[1];
    const otherPlayerX = otherPlayerPos[0];
    return newPos[1] === otherPlayerY && newPos[0] === otherPlayerX;
  }

  function determineFacing(){
    let direction = store.getState().player.direction;
    let position = store.getState().player.position;
    switch (direction){
      case "SOUTH":
        return [position[0],position[1]+SPRITE_HEIGHT]
      case "NORTH":
        return [position[0],position[1]-SPRITE_HEIGHT]
      case "EAST":
        return [position[0]+SPRITE_WIDTH,position[1]]
      case "WEST":
        return [position[0]-SPRITE_WIDTH,position[1]]
      default:
    }
  }

  function updateFacing(oldPos, direction){
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        facingPosition: determineFacing()
      }
    })

  }

    // function delayedDispatch(direction, newPos) {
  //   setTimeout(() => 
  //   {
  //   const walkIndex = getWalkIndex();
  //   store.dispatch({
  //     type: "MOVE_PLAYER",
  //     payload: {
  //       position: newPos,
  //       direction,
  //       walkIndex,
  //       spriteLocation: getSpriteLocation(direction, walkIndex),
  //     }
  //   });
  // }
  //   , 1000);}

  function attemptMove(direction) {

    setTimeout(() => 
    {    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    const walkIndex = store.getState().player.walkIndex;

    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        direction,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        facingPosition: determineFacing()
      }
    })

    if (
      observerBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      !compareLocations(newPos)
    ) {
      dispatchMove(direction, newPos);
      updateFacing();
    } else if (
      observerBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      compareLocations(newPos)
    ) {
      dispatchAttack();
      updateFacing();
    }
      }, 30);
    }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 32: 
        return interact()
      case 37:
        return attemptMove("WEST");
      case 38:
        return attemptMove("NORTH");
      case 39:
        return attemptMove("EAST");
      case 40:
        return attemptMove("SOUTH");
      default:
        console.log(e.keyCode);
    }
  }

  //   function startRandomMovement(e) {
  //     let randomDirection = ["SOUTH", "NORTH", "EAST", "WEST"]
  //     e.preventDefault();
  //     if (e) {
  //       setInterval(()=>{attemptMove(randomDirection[Math.floor(Math.random()*randomDirection.length)])}, 1000)
  //   }
  // }


  // function animate(direction, walkIndex){
  //   setTimeout(() => 
  //   { getSpriteLocation(direction, walkIndex); 
  //   }, 100);}

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "NORTH":
        return `${SPRITE_WIDTH * walkIndex}px ${SPRITE_HEIGHT * 1}px`;
      case "EAST":
        return `${SPRITE_WIDTH * walkIndex}px ${SPRITE_HEIGHT * 2}px`;
      case "WEST":
        return `${SPRITE_WIDTH * walkIndex}px ${SPRITE_HEIGHT * 3}px`;
      case "SOUTH":
        return `${SPRITE_WIDTH * walkIndex}px ${SPRITE_HEIGHT * 4}px`;
      default:
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 2 ? 1 : walkIndex + 1;
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  function animateTile(){
    store.dispatch(function (dispatch) {
      setTimeout(() => { 
        dispatch({type:'ANIMATE_STATIC'})
      }, 500)
      setTimeout(() => { 
        dispatch({type:'ANIMATE_STATIC2'})
      }, 1000)
    })
  }
  return player;
}
