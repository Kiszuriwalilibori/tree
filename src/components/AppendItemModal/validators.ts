import * as Yup from 'yup';

export const validators = Yup.object().shape({
    inputValue: Yup.string()
        .matches(
            /\d|[A-z]/,
            'Kryterium musi zawierać choć jedną literę lub cyfrę'
        )
        .required('Required'),
});
