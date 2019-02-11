import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { LoginForm } from '../../../../modules/Auth';
import { handleCreators, handleLoginProps, ILoginFormOwnProps } from '../../../../modules/Auth/components/LoginForm';

describe('LoginFrom should', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    let props: ILoginFormOwnProps;

    beforeEach(() => {
        props = {
            email: 'testEmail',
            password: 'testPassword',
            onChange: () => ({}),
        };
        wrapper = shallow(<LoginForm {...props} />);
    });

    it('match snapshot', () => expect(wrapper).toMatchSnapshot());

    it('decorate component with login form props', () => {
        expect(handleLoginProps(props)).toEqual({
            errorMessage: 'Invalid credentials',
            fields: [{
                name: 'email',
                required: true,
                value: 'testEmail',
            },
            {
                name: 'password',
                required: true,
                type: 'password',
                value: 'testPassword',
            }],
            submitLabel: 'Login',
        });
    });

    it('decorate component onLogin method', () => {
        const onLoginSpy = jest.fn(({email, password, key}: any) =>
            ({email, password, key}));
        expect(handleCreators
            .onSubmit({onLogin: onLoginSpy, email: props.email, password: props.password})())
                .toEqual({
                email: 'testEmail',
                key: 'loginForm',
                password: 'testPassword',
            });
        expect(onLoginSpy).toHaveBeenCalledTimes(1);
    });

});
