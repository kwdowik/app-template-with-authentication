import * as React from 'react';

import { shallow } from 'enzyme';
import { Loader } from '../../../../modules/Common';

describe('Loader should', () => {

    it('render circural loader', () => {
        const wrapper = shallow(<Loader type="Circle" />);
        expect(wrapper.find('div').hasClass('loader-circle'));
    });

    it('render linear loader', () => {
        const wrapper = shallow(<Loader type="Linear" />);
        expect(wrapper.find('div').hasClass('loader-linear'));
    });
});
