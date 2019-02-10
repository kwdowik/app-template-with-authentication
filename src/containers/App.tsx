import { Box, Clock, Grid, Grommet } from 'grommet';
import * as React from 'react';
import { Header } from '../modules/Header';
import { theme } from '../theme';

const App: React.SFC<any> = (props: {children: any}) => {
  return (
    <Grommet className="full-height" theme={theme}>
        <Grid
            rows={['xsmall', 'auto']}
            className="full-height"
            columns={['small', 'auto']}
            gap="small"
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'nav', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >
            <Box gridArea="header" background="brand">
                <Header />
            </Box>
            <Box direction="row" gridArea="nav" background="light-5" />
            <Box gridArea="main" background="light-2">
                {props.children}
                <Box alignSelf="end" justify="end">
                    <Clock className="clock" type="digital" />
                </Box>
            </Box>
        </Grid>
    </Grommet>
  );
};

export default App;
