class Rectangle {
    constructor() {

        this.id = 0;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        this.startPointX = 0;
        this.startPointY = 0;
        
        this.rectangles = [];
    }

    createRectangle(x, y, width, height) {
        return {
            id : this.id,
            x,
            y,
            width,
            height
        }
    }

    addRectangle(x, y, width, height) {

        if (width < 0 && height < 0) {

            x += width;
            y += height;
            width = Math.abs(width);
            height = Math.abs(height);
        }

        if (x && y && width && height) {
        
            this.id += 1;

            if (this.rectangles.length == 0) {
                this.id = 0;
            }

            this.rectangles.push(
                {
                    id: this.id,
                    x,
                    y,
                    width,
                    height
                }
            );
        }
    }

    changeSize(e, selectedRectangle) {
        //newWidth = e.offsetX - (xRectSelect - selectedRectangle.x);
        let newPointX = selectedRectangle.x;
        let newPointY = e.offsetY;
        let newHeight = (selectedRectangle.y - e.offsetY) + selectedRectangle.height;

        return newPointX, newPointY, newHeight;
    }

    changePosition(e, xRectSelect, yRectSelect, selectedRectangle) {
        let newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
        let newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);

        return newPointX, newPointY;
    }

    renderRectangles(rectangles, ctx, id = "") {
        rectangles.forEach(rectangle => {
            if (rectangle.id === id)
                return;
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
    }
}

export default Rectangle;