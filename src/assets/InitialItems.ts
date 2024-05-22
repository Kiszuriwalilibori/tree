import { Items } from "types/index";

export const InitialItems: Items = [
    { children: ["age", "ethnicity", "income"], content: "People", hasChildren: true, id: "root", isRoot: true, parent: null },
    { children: undefined, content: "Ethnicity", hasChildren: true, id: "ethnicity", isRoot: false, parent: "root" },
    { children: undefined, content: "Age 40+", hasChildren: false, id: "age", isRoot: false, parent: "root" },
    { children: undefined, content: "Income yearly 45kUSD+", hasChildren: false, id: "income", isRoot: false, parent: "root" },
];
