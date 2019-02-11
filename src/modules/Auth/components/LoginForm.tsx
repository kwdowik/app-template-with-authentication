import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { login } from '..';
import { IAppState } from '../../../model';
import { FormComponent, IFormProps } from '../../../modules/Common';
import { getRequest } from '../../Api';

interface ILoginFormOwnProps {
    email: string;
    password: string;
    onChange: (key: string, value: string) => void;
}

const LoginForm = compose<IFormProps, ILoginFormOwnProps>(
    connect(
        (state: IAppState, ownProps: ILoginFormOwnProps) => ({
            requestState: getRequest('loginForm')(state),
            ...ownProps,
        }),
        (dispatch: Dispatch) => bindActionCreators({ onLogin: login }, dispatch),
    ),
    withProps((props: ILoginFormOwnProps) => {
        const fields = [{
                name: 'email',
                required: true,
                value: props.email,
            },
            {
                name: 'password',
                required: true,
                type: 'password',
                value: props.email,
            },
        ];
        return {
            fields,
            submitLabel: 'Login',
            errorMessage: 'Invalid credentials',
        };
    }),
    withHandlers({
        onSubmit: ({onLogin, email, password}: any) => () =>
            onLogin({email, password, key: 'loginForm'}),
    }),
    )(FormComponent);

export { LoginForm };
