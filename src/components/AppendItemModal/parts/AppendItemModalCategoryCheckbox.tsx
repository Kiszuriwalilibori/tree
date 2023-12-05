import { FieldInputProps } from "formik";

import { renderConditionally } from "HOCs";

interface Props {
    fieldProps: FieldInputProps<any>;
    id?: string;
}
/**
 * creates checkbox to choose whether it should be created regular node or branch
 * @param props id: node id, checkboxProps: Formik
 * @returns react checkbox component if primary === true or null otherwise
 */
const Checkbox = (props: Props): JSX.Element => {
    const { fieldProps, id } = props;

    return (
        <div>
            <input className="styled-checkbox" id={id} type="checkbox" {...fieldProps}></input>
            <label htmlFor={id}>Inicjować katalog?</label>
        </div>
    );
};

export default renderConditionally(Checkbox);
