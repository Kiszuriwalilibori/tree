import { FormikErrors } from 'formik';

import { AppendItemModalFormValues } from '../model';
import { warnings } from '../../../config';

function getWarningMessage(
    errors: FormikErrors<AppendItemModalFormValues>,
    values: AppendItemModalFormValues,
    submitCount: number,
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
