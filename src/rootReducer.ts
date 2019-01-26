import { combineReducers, Reducer } from 'redux';

import { IAppState } from './model';
import { reducer as apiReducer } from './modules/Api';
import { reducer as authReducer } from './modules/Auth';

export const reducer: Reducer<IAppState> = combineReducers({
    auth: authReducer,
    api: apiReducer,
});
