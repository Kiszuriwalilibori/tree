import { ID, Items } from "./types";
export const ROOT_ID: ID = "root";

export const INITIAL_ITEMS: Items = [
    { children: ["age", "ethnicity", "income"], content: "People", hasChildren: true, id: ROOT_ID, isRoot: true, parent: null },
    { children: undefined, content: "Ethnicity", hasChildren: true, id: "ethnicity", isRoot: false, parent: ROOT_ID },
    { children: undefined, content: "Age 40+", hasChildren: false, id: "age", isRoot: false, parent: ROOT_ID },
    { children: undefined, content: "Income yearly 45kUSD+", hasChildren: false, id: "income", isRoot: false, parent: ROOT_ID },
];
