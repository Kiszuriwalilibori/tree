import { render } from '@testing-library/react';
import { FieldInputProps } from 'formik';

import {
    AppendItemModalCategoryCheckbox,
    InitializeCategoryProps,
} from '../../../src/components/AppendItemModal/AppendItemModalCategoryCheckbox';

describe('Given AppendItemModalCategoryCheckbox component', () => {
    function createProps(
        props: Partial<InitializeCategoryProps>
    ): InitializeCategoryProps {
        return {
            checkboxProps: {} as FieldInputProps<any>,
            id: 'initialize',
            primary: true,
            ...props,
        };
    }

    describe('when primary prop is not true', () => {
        it('should not render the component', () => {
            const props = createProps({ primary: false });

            const { container } = render(
                <AppendItemModalCategoryCheckbox {...props} />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('when primary prop is true', () => {
        it('should render a checkbox with checkboxProps', () => {
            const props = createProps({
                checkboxProps: { name: 'test' } as FieldInputProps<any>,
            });

            const { getByLabelText } = render(
                <AppendItemModalCategoryCheckbox {...props} />
            );

            const checkbox = getByLabelText('Inicjować katalog?');

            expect(checkbox.attributes.getNamedItem('name').value).toBe('test');
        });
    });
});
