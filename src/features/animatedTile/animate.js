import store from "../../config/store";
import {
  SPRITE_WIDTH,
} from "../../config/constant" 

export default function animateTile(chest){

  function dispatchAnimate() {
    const frameIndex = getFrameIndex();
    store.dispatch({
      type: "ANIMATE",
      payload: {
        frameIndex,
        spriteLocation: getSpriteLocation(frameIndex),
      }
    });
  }

  function getSpriteLocation(frameIndex) {
        return `${SPRITE_WIDTH * frameIndex}px 0px`
    }

  function getFrameIndex() {
    const frameIndex = store.getState().chest.frameIndex;
    return frameIndex >= 2 ? 0 : frameIndex + 1;
  }
  
  function startAnimate() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {dispatchAnimate(); }, 500);
  }
}

  return chest;  
}

  // setInterval(() => {dispatchAnimate(); }, 500);

