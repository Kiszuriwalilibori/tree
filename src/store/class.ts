import { InitialItems } from "assets/InitialItems";
import { Items } from "types";
import { create } from "zustand";
import createSelectors from "./createSelectors";

class Rectangle {
    height: number;
    width: number;
    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
    *getSides() {
        yield this.height;
        yield this.width;
        yield this.height;
        yield this.width;
    }
}

const square = new Rectangle(10, 10);

interface Foo {
    testItems: Rectangle;
}

export const useTestStore = create<Foo>(set => ({
    testItems: square,
}));
