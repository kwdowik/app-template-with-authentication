import * as React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import App from '../../containers/App';
import { Home } from '../../containers/Home';
import Login from '../../containers/Login';
import { IAppState } from '../../model';
import { Logout } from '../../modules/Auth';
import { isUserAuthorized } from '../selectors';
import { PrivateRoute } from './PrivateRoute';

interface IRouterProps {
    isAuth: boolean;
}

const RouterSFC: React.SFC<IRouterProps> = ({ isAuth }: IRouterProps) => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute isAuth={!isAuth} exact path="/login" component={Login} redirectUrl="/home" />
                <PrivateRoute isAuth={isAuth} path="/logout" component={Logout} />
                <Route path="/" render={() => {
                    return (
                        <Switch>
                            <App>
                                <PrivateRoute isAuth={isAuth} exact path="/:filter?" component={Home} />
                                <PrivateRoute exact isAuth={isAuth} path="/home" component={Home} />
                            </App>
                        </Switch>
                    );
                }} />
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
