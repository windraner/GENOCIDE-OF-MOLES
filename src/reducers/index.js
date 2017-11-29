import { combineReducers } from 'redux';

import holeReducer from './holeReducer';
import statusReducer from './statusReducer';

export default combineReducers({
	holeReducer,
	statusReducer
});