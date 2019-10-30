import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'
import player2Reducer from '../features/player2/reducer'
import chestReducer from '../features/animatedTile/reducer'

const rootReducer = combineReducers({
  player: playerReducer,
  player2: player2Reducer,
  map: mapReducer,
  chest: chestReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
  );

export default store