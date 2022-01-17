import { FieldInputProps } from 'formik';

export interface InitializeCategoryProps {
    checkboxProps: FieldInputProps<any>;
    id?: string;
    primary?: boolean;
}

export const AppendItemModalCategoryCheckbox = (
    props: InitializeCategoryProps
): JSX.Element => {
    const { checkboxProps, id, primary } = props;

    if (!primary) {
        return null;
    }

    return (
        <div>
            <input
                className="styled-checkbox"
                id={id}
                type="checkbox"
                {...checkboxProps}
            ></input>
            <label htmlFor={id}>Inicjować katalog?</label>
        </div>
    );
};
