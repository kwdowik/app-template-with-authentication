import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';

describe('App component should', () => {

    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => wrapper = shallow(<App />));

    it('match to snapshot', () => expect(wrapper).toMatchSnapshot());
});
