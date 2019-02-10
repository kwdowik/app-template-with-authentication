import * as React from 'react';

import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { ILoginPayload, login } from '..';
import { IAppState } from '../../../model';
import { Loader } from '../../../modules/Common';
import { getRequest, IRequestState } from '../../Api';

interface ILoginFormProps {
    onEmailChange: (value: string) => any;
    onPasswordChange: (value: string) => any;
    requestState: IRequestState;
    email: string;
    password: string;
    onLogin: (data: ILoginPayload) => any;
}

interface ILoginFormOwnProps {
    email: string;
    password: string;
    onChange: (key: string, value: string) => void;
}

const LoginFormComponent: React.SFC<ILoginFormProps> =
    ({ onLogin, onEmailChange, onPasswordChange, email, password, requestState }: ILoginFormProps) => {
        const { isError, isLoading } =
            Boolean(requestState) ? requestState : {isLoading: false, isError: false};
        return (
            <Box width="medium">
                    <Form onSubmit={() => onLogin({ email, password, key: 'loginForm' })}>
                        <FormField>
                            <TextInput
                                placeholder="email"
                                onChange={({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
                                    onEmailChange(value)}
                                required
                            />
                        </FormField>
                        <FormField>
                            <TextInput
                                placeholder="password"
                                type="password"
                                required
                                onChange={({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
                                    onPasswordChange(value)}
                            />
                        </FormField>
                        {isError &&
                            <Box>
                                <Text textAlign="center" color="status-error" size="medium">
                                    Invalid credentials
                                </Text>
                            </Box>
                        }
                        {isLoading &&
                            <Box align="center">
                                <Loader type="Linear" />
                            </Box>
                        }
                        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                            <Button
                                disabled={isEmpty(email) || isEmpty(password)} type="submit" label="Login"
                            />
                        </Box>
                    </Form>
                </Box>
        );
};

const LoginForm = compose<ILoginFormProps, ILoginFormOwnProps>(
    connect(
        (state: IAppState, ownProps: ILoginFormOwnProps) => ({
            requestState: getRequest('loginForm')(state),
            ...ownProps,
        }),
        (dispatch: Dispatch) => bindActionCreators({ onLogin: login }, dispatch),
    ),
    withHandlers({
        onEmailChange: ({onChange}: ILoginFormOwnProps) => (value: string) => onChange('email', value),
        onPasswordChange: ({onChange}: ILoginFormOwnProps) => (value: string) => onChange('password', value),
    }),
    )(LoginFormComponent);

export { LoginForm };
