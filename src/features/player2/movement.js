import store from "../../config/store";
import {
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  MAP_WIDTH,
  MAP_HEIGHT
} from "../../config/constant";

export default function handleMovement(player2) {
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

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER2",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  function dispatchAttack() {
    const health = getHealth();
    store.dispatch({
      type: "ATTACK_PLAYER2",
      payload: {
        health
      }
    });
  }

  function getHealth() {
    const health = store.getState().player.health;
    return health - 1;
  }

  function compareLocations(newPos) {
    const otherPlayerPos = store.getState().player.position;
    const otherPlayerY = otherPlayerPos[1];
    const otherPlayerX = otherPlayerPos[0];
    return newPos[1] === otherPlayerY && newPos[0] === otherPlayerX;
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player2.position;
    const newPos = getNewPosition(oldPos, direction);

    if (
      observerBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      !compareLocations(newPos)
    ) {
      dispatchMove(direction, newPos);
    } else if (
      observerBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      compareLocations(newPos)
    ) {
      dispatchAttack();
    }
  }

  // function handleKeyDown(e) {
  //   e.preventDefault();
  //   switch (e.keyCode) {
  //     case 37:
  //       return attemptMove("WEST");
  //     case 38:
  //       return attemptMove("NORTH");
  //     case 39:
  //       return attemptMove("EAST");
  //     case 40:
  //       return attemptMove("SOUTH");
  //     default:
  //       console.log(e.keyCode);
  //   }
  // }

  // function startPlayer2(e) {
  //   e.preventDefault();
  //   if (e) {startRandomMovement()}
  // }
  
  const randomDirection = ["SOUTH", "NORTH", "EAST", "WEST"];
    const intervalID = setInterval(() => {
        testing(
          randomDirection[Math.floor(Math.random() * randomDirection.length)]
        );
      }, 500);

  function testing() {
    let isMoving = store.getState().player2.dialogue;
    if (!isMoving){
    setTimeout(() => {
          attemptMove(
            randomDirection[Math.floor(Math.random() * randomDirection.length)]
          );
        }, 2000);
  }
};
  

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
    const walkIndex = store.getState().player2.walkIndex;
    return walkIndex >= 2 ? 0 : walkIndex + 1;
  }

  // window.onload = startRandomMovement();

  return player2;
}
