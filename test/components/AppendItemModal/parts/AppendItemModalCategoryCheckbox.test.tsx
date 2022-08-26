import { render, screen } from '@testing-library/react';
import { FieldInputProps } from 'formik';
import {
    AppendItemModalCategoryCheckbox,
    InitializeCategoryProps,
} from '../../../../src/components/AppendItemModal/parts/AppendItemModalCategoryCheckbox';
describe('Given AppendItemModalCategoryCheckbox component', () => {
    function createProps(props: Partial<InitializeCategoryProps>): InitializeCategoryProps {
        return {
            checkboxProps: {} as FieldInputProps<any>,
            id: 'initialize',
            primary: true,
            ...props,
        };
    }

    describe('when primary prop is false', () => {
        it('should not render anything', () => {
            const props = createProps({ primary: false });
            const { container } = render(<AppendItemModalCategoryCheckbox {...props} />);
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when primary prop is true', () => {
        it('should render a checkbox with checkboxProps', () => {
            const props = createProps({
                checkboxProps: { name: 'test' } as FieldInputProps<any>,
            });

            const { getByLabelText, container } = render(<AppendItemModalCategoryCheckbox {...props} />);

            //const checkbox = getByLabelText('Inicjować katalog?');
            const checkbox = document.querySelector(`label[for=${`initialize`}]`);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox).toHaveTextContent('Inicjować katalog?');
            //expect(checkbox.attributes.getNamedItem('name').value).toBe('test');
            const input = document.querySelector(`input.styled-checkbox[id=${props.id}][type=${`checkbox`}]`);
            expect(input).toBeInTheDocument();

            expect(input).toBe(container.children[0].children[0]);
            expect(checkbox).toBe(container.children[0].children[1]);
        });
    });
});
