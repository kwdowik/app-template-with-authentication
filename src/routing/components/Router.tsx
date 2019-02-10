import * as React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Home } from '../../containers/Home';
import Login from '../../containers/Login';
import { Logout } from '../../containers/Logout';
import { IAppState } from '../../model';
import { isUserAuthorized } from '../selectors';
import { PrivateRoute } from './PrivateRoute';

interface IRouterProps {
    isAuth: boolean;
}

const RouterSFC: React.SFC<IRouterProps> = ({ isAuth }: IRouterProps) => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute isAuth={isAuth} path="/home" component={Home} />
                <PrivateRoute isAuth={isAuth} path="/logout" component={Logout} />
                <PrivateRoute isAuth={!isAuth} path="/:filter?" component={Login} redirectUrl="/home" />
            </Switch>
        </BrowserRouter>
    );
};

const Router = connect(createStructuredSelector<IAppState, IRouterProps>({
        isAuth: isUserAuthorized,
    }),
    null,
)(RouterSFC);

Router.displayName = 'Router';

export { Router };
