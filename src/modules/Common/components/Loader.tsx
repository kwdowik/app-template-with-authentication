import * as React from 'react';

import '../../../assets/scss/index.scss';

interface ILoaderProps {
    type: 'Circle' | 'Linear';
}

const Loader: React.SFC<ILoaderProps> = ({type}) =>
    <div className={`loader-${type === 'Circle' ? 'circle' : 'linear'}`} />;

export { Loader };
