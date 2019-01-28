import { Grommet } from 'grommet';
import * as React from 'react';
import { theme } from '../theme';

const App: React.SFC<any> = (props: {children: any}) => {
  return (
    <Grommet theme={theme}>
      {props.children}
    </Grommet>
  );
};

export default App;
