import { FormikErrors } from "formik";

import { AppendItemModalFormValues } from "../model";
import { warnings } from "../../../config";

/**
 * Returns error message suitable to situation
 * @param errors
 * @param values
 * @param submitCount
 * @returns string representing warning message or null if params does not match any of provided values
 */

function getWarningMessage(
    errors: FormikErrors<AppendItemModalFormValues>,
    values: AppendItemModalFormValues,
    submitCount: number
): string | null {
    if (values.isNotValidated) {
        return warnings.duplicate;
    }

    if (submitCount > 0 && errors.inputValue) {
        return errors.inputValue;
    }

    return null;
}

export default getWarningMessage;
