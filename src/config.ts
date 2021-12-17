export const Items = {
    VERY_FIRST_ITEM: 'People',
};

export const initialData = [
    Items.VERY_FIRST_ITEM,
    'Age 40+',
    ['Ethnicity', 'Black', 'Hispanic'],
    'Income yearly 45kUSD+',
];

export const InitialNodes = initialData.flat();

export const warnings = {
    missingAlphaChars: 'Nazwa kryterium musi zawierać choć jeden znak alfanumeryczny!',
    duplicate: 'Takie kryterium już jest. Nie można dodać go po raz drugi.',
};
