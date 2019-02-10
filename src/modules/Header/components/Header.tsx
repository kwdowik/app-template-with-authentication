import * as React from 'react';

import { Box, Button } from 'grommet';

const Header: React.SFC<{}> = () => {
    return (
        <Box align="end" justify="center">
            <Button
                href ="/logout"
                label="Logout"
                hoverIndicator
                margin={{top: 'medium', right: 'xsmall'}}
            />
        </Box>
    );
};

Header.displayName = 'Header';

export { Header };
