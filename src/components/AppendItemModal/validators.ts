import * as Yup from 'yup';

import { warnings } from '../../config';

export const validators = Yup.object().shape({
    inputValue: Yup.string()
        .matches(/\d|[A-z]/, warnings.missingAlphaChars)
        .required('Required'),
});
