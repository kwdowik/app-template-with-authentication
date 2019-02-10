import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    isAuth: boolean;
    component: React.ComponentClass<any> | React.FunctionComponent<any>;
    redirectUrl?: string;
}

const PrivateRoute: React.SFC<IPrivateRouteProps> =
    ({isAuth, component: Component, redirectUrl, ...props}: IPrivateRouteProps) => {
    const render = () => isAuth ? <Component /> : <Redirect to={redirectUrl || '\login'} />;
    return <Route {...props} render={render} />;
};

export { PrivateRoute };
