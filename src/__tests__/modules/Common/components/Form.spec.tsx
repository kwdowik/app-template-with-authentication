import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { FormField, Form } from 'grommet';
import { FormComponent, IField, IFormProps } from '../../../../modules/Common';

describe('FormComponent should',  () => {
    let props: IFormProps;
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        props = {
            errorMessage: 'testErrorMessage',
            onChange: jest.fn(),
            onSubmit: jest.fn(),
            submitLabel: 'testSubmitLabel',
            requestState: {
                id: '1',
                isError: false,
                isLoading: false,
            },
            fields: [{
                name: 'testName',
                required: true,
                value: 'testValue',
            }] as IField[],
        };
        wrapper = shallow(<FormComponent {...props} />);
    });

    it('match to snapshot', () =>
        expect(wrapper).toMatchSnapshot());

    it('display FormField', () =>
        expect(wrapper.find(FormField).length).toBe(1));

    it('display error', () => {
        const newProps = {...props,
            requestState: {
                ...props.requestState,
                isError: true,
            },
        };

        const newWrapper = shallow(<FormComponent {...newProps} />);

        expect(newWrapper.find('#errorMessage').length).toBe(1);
    });

    it('disalbed button when required fields are empty', () => {
        expect(wrapper.find('#submit').prop('disabled')).toBe(false);

        const newProps = {...props,
            fields: [{...props.fields[0], value: ''}],
        };

        const newWrapper = shallow(<FormComponent {...newProps} />);

        expect(newWrapper.find('#submit').prop('disabled')).toBe(true);
    });

    it('display Loader', () => {
        const newProps = {...props,
            requestState: {
                ...props.requestState,
                isLoading: true,
            },
        };

        const newWrapper = shallow(<FormComponent {...newProps} />);

        expect(newWrapper.find('Loader').length).toBe(1);
    });

    it('invoke submit when form has been submited', () => {
        wrapper.find(Form).prop('onSubmit')();
        expect(props.onSubmit).toHaveBeenCalled();
    });

    it('invoke onChange when form has been submited', () => {
        wrapper.find('#input-0').prop('onChange')!({target: { value: 'newTestValue' }} as any);
        expect(props.onChange).toHaveBeenCalled();
    });
});
