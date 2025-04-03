import Shape from "/Shape.js";

class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    changeSize() {

    }

    changePosition(xRectSelect, yRectSelect, selectedRectangle) {
        let newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
        let newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);

        return newPointX, newPointY;
    }
}
