import { cleanup, render, screen } from "../../test/test-utils/testing-library-utils";
import { LocalApp } from "../../src/components/App";

import cloneDeep from "lodash/cloneDeep";
const mockItems = ["test123", "123test"];

const mockAppTitleText = "Hi from MockAppTitle";
const mockAppTitle = jest.fn();

jest.mock("../../src/components/MainTree/AppTitle", () => props => {
    mockAppTitle(props);
    return <div>{mockAppTitleText}</div>;
});

const mockAppendItemModalText = "Hi from MockAppendItemModal";
const mockAppendItemModal = jest.fn();

jest.mock("../../src/components/AppendItemModal/AppendItemModal", () => props => {
    mockAppendItemModal(props);
    return <div>{mockAppendItemModalText}</div>;
});

const mockMainTreeText = "Hi from MockMainTree";
const mockMainTree = jest.fn();

jest.mock("../../src/components/MainTree/MainTree", () => props => {
    mockMainTree(props);
    return <div>{mockMainTreeText}</div>;
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});
describe("Given App component", () => {
    describe("when renders", () => {
        test("it renders component with main tag", () => {
            const { container } = render(<LocalApp items={mockItems} isAppendItemModalVisible={true} />);
            expect(container.children[0]).toBe(document.querySelector("main"));
        });
        test("this main has AppTitle as first child", () => {
            const { container } = render(<LocalApp items={mockItems} isAppendItemModalVisible={true} />);
            expect(container.children[0].children[0]).toHaveTextContent(mockAppTitleText);
        });
        test("if prop isAppendItemModalVisible is false, it does not render AppendItemModal", () => {
            const { container } = render(<LocalApp items={mockItems} isAppendItemModalVisible={false} />);
            expect(mockAppendItemModal).not.toBeCalled();
        });
        test("if prop isAppendItemModalVisible is true, it renders AppendItemModal as second child of main", () => {
            const { container } = render(<LocalApp items={mockItems} isAppendItemModalVisible={true} />);
            expect(container.children[0].children[1]).toHaveTextContent(mockAppendItemModalText);
        });
        test("it renders MainTree as third child of main with proper props", () => {
            const { container } = render(<LocalApp items={mockItems} isAppendItemModalVisible={true} />);
            const criterias = mockItems ? cloneDeep(mockItems) : null;
            const header = criterias ? (criterias.shift() as string) : null;
            expect(mockMainTree).toBeCalledWith(
                expect.objectContaining({
                    ary: criterias,
                    header: header,
                })
            );
            expect(container.children[0].children[2]).toHaveTextContent(mockMainTreeText);
        });
    });
});
