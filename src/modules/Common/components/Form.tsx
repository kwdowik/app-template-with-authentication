import * as React from 'react';

import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import { isEmpty } from 'lodash';
import { Loader } from '../../../modules/Common';
import { IRequestState } from '../../Api';

interface IFormProps {
    onChange: (key: string, value: string) => void;
    onSubmit: (obj: any) => any;
    requestState: IRequestState;
    submitLabel: string;
    errorMessage: string;
    fields: IField[];
}

interface IField {
    name: string;
    required: boolean;
    type?: string;
    value: any;
}

const FormComponent: React.SFC<IFormProps> =
    ({ onSubmit, fields, errorMessage, onChange, requestState, submitLabel }: IFormProps) => {
        const { isError, isLoading } =
            Boolean(requestState) ? requestState : {isLoading: false, isError: false};
        return (
            <Box width="medium">
                    <Form onSubmit={onSubmit}>
                        {fields.map((f: IField, index: number) =>
                            <FormField key={index}>
                                <TextInput
                                    id={`input-${index}`}
                                    placeholder={f.name}
                                    name={f.name}
                                    onChange={({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
                                        onChange(f.name, value)}
                                    required={f.required}
                                    type={f.type || 'text'}
                                />
                            </FormField>,
                        )}
                        {isError &&
                            <Box>
                                <Text id="errorMessage" textAlign="center" color="status-error" size="medium">
                                    {errorMessage}
                                </Text>
                            </Box>
                        }
                        {isLoading &&
                            <Box align="center">
                                <Loader type="Linear" />
                            </Box>
                        }
                        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                            <Button
                                id="submit"
                                disabled={fields.filter((f: IField) => f.required && isEmpty(f.value)).length !== 0}
                                type="submit" label={submitLabel}
                            />
                        </Box>
                    </Form>
                </Box>
        );
};

FormComponent.displayName = 'FormComponent';

export { FormComponent, IFormProps, IField };
