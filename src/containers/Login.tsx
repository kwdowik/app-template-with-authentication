import * as React from 'react';

import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppState } from '../model';
import { getRequest, IRequestState } from '../modules/Api';
import { getToken, login } from '../modules/Auth';
import { ILoginPayload } from '../modules/Auth';
import { Loader } from '../modules/Common';

interface ILoginContainerProps {
    login: (data: ILoginPayload) => any;
    token: string | null;
    requestState: IRequestState;
}

interface ILoginContainerState {
    email: string;
    password: string;
}

class LoginContainer extends React.Component<ILoginContainerProps, ILoginContainerState> {
    constructor(props: ILoginContainerProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    public render(): JSX.Element {
        const { login: onLogin, requestState } = this.props;
        const { isError, isLoading } =
            Boolean(requestState) ? requestState : {isLoading: false, isError: false};
        const { email, password } = this.state;
        return (
            <Box fill align="center" justify="center">
                <Box>
                    <Heading margin={{vertical: 'xlarge'}} color="brand">Expense Counter</Heading>
                </Box>
                <Box width="medium">
                    <Form onSubmit={() => onLogin({ email, password, key: 'loginForm' })}>
                        <FormField>
                            <TextInput
                                placeholder="email"
                                onChange={(event: any) => this.setState({ email: event.target.value })}
                                required
                            />
                        </FormField>
                        <FormField>
                            <TextInput
                                placeholder="password"
                                type="password"
                                required
                                onChange={(event: any) => this.setState({ password: event.target.value })}
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
            </Box>
        );
    }
}

const Login = connect(
    (state: IAppState) => ({
      token: getToken(state),
      requestState: getRequest('loginForm')(state),
    }),
    (dispatch: Dispatch) => bindActionCreators({ login }, dispatch),
)(LoginContainer);

export default Login;
