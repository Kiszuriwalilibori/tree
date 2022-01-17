import { fireEvent, render } from '@testing-library/react';
import { FieldInputProps } from 'formik';

import {
    AppendItemModalCriterion,
    CriterionProps,
} from '../../../src/components/AppendItemModal/AppendItemModalCriterion';

describe('Given AppendItemModalCriterion component', () => {
    function createProps(props: Partial<CriterionProps> = {}): CriterionProps {
        return {
            inputProps: {
                value: 'Fake Criterion',
            } as FieldInputProps<unknown>,
            onClose: jest.fn(),
            ...props,
        };
    }

    describe('when rendered', () => {
        it('should display a textbox with provided inputProps', () => {
            const { inputProps } = createProps();

            const props = createProps({
                inputProps: { ...inputProps, value: 'just a test' },
            });

            const { getByRole } = render(
                <AppendItemModalCriterion {...props} />
            );
            const textBox = getByRole('textbox');

            expect((textBox as HTMLInputElement).value).toBe('just a test');
        });
    });

    describe('when "Zamknij" button is clicked', () => {
        it('should execute onClose callback', () => {
            const onClose = jest.fn();
            const props = createProps({ onClose });
            const { getByText } = render(
                <AppendItemModalCriterion {...props} />
            );
            const button = getByText('Zamknij');

            fireEvent.click(button);

            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});
