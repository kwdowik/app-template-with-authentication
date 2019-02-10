import * as React from 'react';

import { shallow } from 'enzyme';
import { Redirect } from 'react-router';
import { Home } from '../../../containers/Home';
import { IPrivateRouteProps, PrivateRoute } from '../../../routing/components/PrivateRoute';

describe('PrivateRoute component should', () => {
    let props: IPrivateRouteProps;

    beforeEach(() => props = {
        component: Home,
        isAuth: false,
    });

    it('redirect to default url when user is unauthorized', () => {
        const wrapper = shallow(<PrivateRoute {...props} />);
        expect(wrapper.prop('render')()).toEqual(<Redirect to="\login" />);
    });

    it('redirect to redirectUrl from props when user is unauthorized', () => {
        const wrapper = shallow(<PrivateRoute {...props} redirectUrl={'\\home'} />);
        expect(wrapper.prop('render')()).toEqual(<Redirect to="\home" />);
    });

    it('render component from props when user is authorized', () => {
        const wrapper = shallow(<PrivateRoute {...props} isAuth />);
        expect(wrapper.prop('render')()).toEqual(<Home />);
    });
});
