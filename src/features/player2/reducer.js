const initialState = {
  position: [200, 0],
  spriteLocation: '0 0',
  direction: 'east',
  walkIndex: 0,
  health: 10,
  dialogue: false,
}

const player2Reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER2':{
      return {...state, ...action.payload};
    }
    case 'ATTACK_PLAYER':{
      return {...state, ...action.payload};
    }
    case 'DIALOGUE':{
      return {...state, dialogue: false}
    }
    default:
      return state
  }
}

export default player2Reducer