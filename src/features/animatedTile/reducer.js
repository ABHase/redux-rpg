
const initialState = {
  spriteLocation: `200px 0px`,
}

// const chestReducer = (state=initialState, action) => {
//   return{
//     type: 'ANIMATE_STATIC',
//     spriteLocation: `400px 0px`
//   }
// }



const chestReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ANIMATE_STATIC':{
      return {...state, 
        spriteLocation: `400px 0px`
        };
    }
    case 'ANIMATE_STATIC2':{
      return {...state, 
        spriteLocation: `600px 0px`
        };
    }
    default:
      return state
  }
}

export default chestReducer