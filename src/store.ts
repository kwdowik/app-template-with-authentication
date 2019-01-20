import { createStore, Store } from 'redux';
import { reducer } from './rootReducer';

export const store: Store = createStore(
    reducer,
);
