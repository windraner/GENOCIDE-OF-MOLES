import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    const store = createStore(
        reducer, 
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
}
