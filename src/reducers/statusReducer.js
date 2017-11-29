import { GAME_DIFFICULT_TIME_DEFAULT } from '../constants/constants.js';

const initialState = {
  startState: true,
	points: 0,
  failed: 0,
	timer: GAME_DIFFICULT_TIME_DEFAULT,
  gameDifficult: 1,
	isPlay: false,
  win: false,
  onPause: false,
  LvlUp: false
};
	
export default function statusReducer(state = initialState, action) {
  switch(action.type) {
    case 'START_GAME': 
      return {
        ...state,
        startState: action.payload
      }

    case 'ADD_POINT':  
      return {
        ...state,
        points: state.points+1
      }

    case 'ADD_FAILED_POINT':
      return {
        ...state,
        failed: state.failed+1  
      }

    case 'LOSE_GAME':
      return {
        ...state,
        failed: 3
      }

    case 'UPDATE_TIMER':  
      return {
        ...state,
        timer: action.payload*60,
        gameDifficult: state.gameDifficult+1,
        LvlUp: true
      }

    case 'LVL_UP_END':  
      return {
        ...state,
        LvlUp: false
      }

    case 'END_GAME':  
      return {
        ...state,
        win: true
      }

    case 'PAUSE_STATUS':
      return {
        ...state,
        onPause: action.payload
      }

    default:
      return state;
  }
}