import { isEqual } from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { ACCESS_TOKEN } from '../constants';
import { IAppState } from '../model';
import { IAuthState } from '../modules/Auth';

const getAuthState = (state: IAppState) => state.auth;

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual,
  );

const isUserAuthorized = createDeepEqualSelector(
    getAuthState,
    (authState: IAuthState) => Boolean(authState.token || localStorage.getItem(ACCESS_TOKEN)));

export { isUserAuthorized };
