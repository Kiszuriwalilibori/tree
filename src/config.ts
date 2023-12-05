export const VERY_FIRST_ITEM = "People";
export const INITIAL_ITEMS = [VERY_FIRST_ITEM, "Age 40+", ["Ethnicity", "Black", "Hispanic"], "Income yearly 45kUSD+"];

export const InitialNodes = INITIAL_ITEMS.flat();

export const warnings = {
    missingAlphaChars: "Kryterium musi zawierać choć jedną literę lub cyfrę",
    duplicate: "Takie kryterium już jest. Nie można dodać go po raz drugi.",
};
