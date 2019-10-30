const initialState = {
  position: [0, 0],
  facingPosition: [0, 75],
  spriteLocation: '0 0',
  direction: 'SOUTH',
  walkIndex: 1,
  health: 10,
}

const playerReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':{
      return {...state, ...action.payload};
    }
    case 'ATTACK_PLAYER2':{
      return {...state, ...action.payload};
    }
      
    default:
      return state
  }
}

export default playerReducer