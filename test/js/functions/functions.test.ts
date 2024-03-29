import { areTablesFittingEachOther, validateAgainstDuplicate } from "../../../src/functions/common";
import { INITIAL_ITEMS } from "../../../src/config";
import { Items } from "../../../src/config";

describe("functions tests suite", () => {
    test("function tableFits", () => {
        expect(areTablesFittingEachOther(INITIAL_ITEMS, ["1", "2"])).toBe(false);
        expect(areTablesFittingEachOther(INITIAL_ITEMS, [Items.VERY_FIRST_ITEM, "2"])).toBe(true);
    });

    test("function validateAgainstDuplicate", () => {
        expect(validateAgainstDuplicate(INITIAL_ITEMS, ["xxxxxxxxxxxxxxxx", Items.VERY_FIRST_ITEM])).toBe(false);
        expect(validateAgainstDuplicate(INITIAL_ITEMS, ["2", "xxxxxxxxxxx"])).toBe(true);
    });
});
