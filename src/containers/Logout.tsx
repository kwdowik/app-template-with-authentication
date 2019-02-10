import * as React from 'react';

import { Box, Text } from 'grommet';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { logout } from '../modules/Auth';
import { Loader } from '../modules/Common';

interface ILogoutProps {
    logout: () => void;
}

class LogoutComponent extends React.Component<ILogoutProps, {}> {
    public componentDidMount(): void {
        this.props.logout();
    }
    public render(): JSX.Element {
        return (
            <Box>
                <Text textAlign="center" size="medium">
                    Logout...
                </Text>
                <Loader type="Circle" />
            </Box>
        );
    }
}

const Logout = connect(
    null,
    (dispatch: Dispatch) => bindActionCreators({ logout }, dispatch),
)(LogoutComponent);

export { Logout };
