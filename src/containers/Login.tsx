import * as React from 'react';

import { Box, Heading } from 'grommet';
import { LoginForm } from '../modules/Auth/components/LoginForm';

interface ILoginContainerState {
    email: string;
    password: string;
}

class Login extends React.Component<{}, ILoginContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    public handleChange(key: 'email' | 'password', value: string) {
        if  ( key === 'email') {
            this.setState({
                email: value,
            });
        } else {
            this.setState({
                password: value,
            });
        }
    }

    public render(): JSX.Element {
        const { email, password } = this.state;
        return (
            <Box fill align="center" justify="center">
                <Box>
                    <Heading margin={{vertical: 'xlarge'}} color="brand">Expense Counter</Heading>
                </Box>
                <LoginForm
                    email={email}
                    password={password}
                    onChange={(key: 'email' | 'password', value: string) => this.handleChange(key, value)}
                />
            </Box>
        );
    }
}

export default Login;
