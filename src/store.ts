import { createStore, compose } from 'redux';
import ligthReducer from './reducers/ligthReducer';

const composeEnhancers =
    //@ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? //@ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export type RootState = ReturnType<typeof ligthReducer>;

const store = createStore(ligthReducer, composeEnhancers());

export default store;
