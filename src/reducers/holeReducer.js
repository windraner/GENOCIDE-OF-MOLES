import { Hole, HoleActive, HoleActiveClick, HoleClick } from '../components/style/style';

const initialState = {};
const blockNumber = 6;

export default function holeReducer(state = initialState, action) {
	switch(action.type) {
    case 'GENERATE_BASIC_BLOCK':
      let newState = {};
      for(let i = 0; i<blockNumber; i++)  {
        newState[i] = { style: Hole, key: i, status: 'noActiv'};
      }
      return {
        ...state,
        ...newState
      }

    case 'GENERATE_LVL':
      let newStateGame = {};
      for(let i = 0; i<blockNumber; i++)  {
        newStateGame[i] = { style: Hole, key: i, status: 'noActiv'};
      }
      newStateGame[action.payload] = {style: HoleActive, key: action.payload, status: 'Activ'};
      return {
        ...state,
        ...newStateGame
      }

    case 'CLICK_ON_TRUE_BLOCK':
      return {
        ...state,
        [action.payload]: { style: HoleActiveClick, key: action.payload, status: '' }
      };

    case 'CLICK_ON_FALSE_BLOCK':
      return {
        ...state,
        [action.payload]: { style: HoleClick, key: action.payload, status: '' }
      };

    default:
      return state;
  }

}