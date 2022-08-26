import { FieldInputProps } from 'formik';

export interface InitializeCategoryProps {
    checkboxProps: FieldInputProps<any>;
    id?: string;
    primary?: boolean;
}
/**
 * creates checkbox to choose whether it should be created regular node or branch
 * @param props primary: informs whether it is main tree node or branch node, id: node id, checkboxProps: Formik
 * @returns react checkbox component if primary === true or null otherwise
 */
export const AppendItemModalCategoryCheckbox = (props: InitializeCategoryProps): JSX.Element => {
    const { checkboxProps, id, primary } = props;

    if (!primary) {
        return null;
    }

    return (
        <div>
            <input className="styled-checkbox" id={id} type="checkbox" {...checkboxProps}></input>
            <label htmlFor={id}>Inicjować katalog?</label>
        </div>
    );
};
