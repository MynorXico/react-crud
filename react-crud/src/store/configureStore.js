import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXSTENSION__ && window.__REDUX_DEVTOOLS_EXSTENSION__(),
        applyMiddleware(thunk)
    );
}