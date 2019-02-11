import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from '../../../../modules/Header';

describe('Header should', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => wrapper = shallow(<Header />));

    it('match snapshot', () => expect(wrapper).toMatchSnapshot());
});
