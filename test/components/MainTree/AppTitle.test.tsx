import * as React from "react";
import AppTitle from "../../../src/components/MainTree/AppTitle";
import { appTitle } from "../../../src/config";
import { render, screen, cleanup } from "../../test-utils/testing-library-utils";

const className = ".AppTitle";
const tag = "h1";

beforeEach(() => {
    render(<AppTitle />);
});

afterEach(() => cleanup());

describe("App title test suite", () => {
    describe("Given AppTitle component", () => {
        test("renders component of given tag", () => {
            const h1 = document.querySelector(tag);
            expect(h1).toBeInTheDocument();
        });
        test("renders component with given className", () => {
            const appTitle = document.querySelector(className);
            expect(appTitle).toBeInTheDocument();
        });
        test("renders component with given text content", () => {
            const title = screen.getByText(appTitle);
            expect(title).toBeInTheDocument();
        });
    });
});
