class Rectangle {
    constructor() {

        this.id = 0;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        this.startPointX = 0;
        this.startPointY = 0;

        this.selectedPointX = null;
        this.selectedPointY = null;

        this.rectangles = [];
    }

    createRectangle(x, y, width, height) {
        return {
            id: this.id,
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

    changeSize(e, selectedPointX, selectedPointY, selectedRectangle) {
        //newWidth = e.offsetX - (xRectSelect - selectedPointX);
        let newPointX = selectedRectangle.x;
        let newPointY = selectedRectangle.y;
        let newWidth = selectedRectangle.width;
        let newHeight = selectedRectangle.height;


        // Top Left

        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointX = e.offsetX;
            newPointY = e.offsetY;
            newWidth = (selectedPointX - e.offsetX) + selectedRectangle.width;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;

            return { newPointX, newPointY, newWidth, newHeight };
        }

        // Top Right
        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointX > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointY = e.offsetY;
            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;
            // newWidth = 400 -300
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;

            return { newPointX, newPointY, newWidth, newHeight };

        }

        // Bottom Right 

        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointX > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;
            newHeight = (e.offsetY - selectedPointY) + selectedRectangle.height;

            return { newPointX, newPointY, newWidth, newHeight };
        }

        // Bottom Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointX > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            // newPointX = e.offsetX;
            // newPointY = e.offsetY;
            // newWidth = (selectedPointX - e.offsetX) + selectedRectangle.width;
            // newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;

            // return { newPointX, newPointY, newWidth, newHeight };
        }
        // Top

        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointY = e.offsetY;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;

            return { newPointX, newPointY, newWidth, newHeight };
        }




        // Right
        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointX > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height) {

            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;

            return { newPointX, newPointY, newWidth, newHeight };

        }



        // Bottom

        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y && selectedPointY < selectedRectangle.y + selectedRectangle.height) {

            newPointY = e.offsetY;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;

            return { newPointX, newPointY, newWidth, newHeight };
        }



        // Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointX > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

        }


        // return { newPointX, newPointY, newWidth, newHeight };
    }

    changePosition(e, xRectSelect, yRectSelect, selectedRectangle) {
        let newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
        let newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);

        return { newPointX, newPointY };
    }

    renderRectangles(rectangles, ctx, id = "") {
        rectangles.forEach(rectangle => {
            if (rectangle.id === id)
                return;
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
    }

    findShape(selectedPointX, selectedPointY, border = true) {
        if (border)
            return this.rectangles.find(rectangle =>
                selectedPointX > rectangle.x && selectedPointX < rectangle.width + rectangle.x
                && selectedPointY > rectangle.y - 10 && selectedPointY < rectangle.y + 10);

        return this.rectangles.find(rectangle => selectedPointX > rectangle.x && selectedPointX < rectangle.width + rectangle.x
            && selectedPointY > rectangle.y && selectedPointY < rectangle.y + rectangle
                .height);

    }

    detectArea() {

        // x - 10 && x + 10
        // y - 10 && y + 10

        // x + width - 10 && x + width + 10
        // y - 10 && y + 10

        // x + width - 10 && x + width + 10
        // y + height - 10 && y + height + 10

        // x - 10 && x + 10
        // y + height - 10 && y + height + 10





        this.rectangles.find(rectangle =>

            selectedPointX > rectangle.x - 10 && selectedPointX < rectangle.x + 10 &&
            selectedPointX > rectangle.y - 10 && selectedPointY < rectangle.y + 10 ||

            selectedPointX > rectangle.x && selectedPointX < rectangle.width + rectangle.x
            && selectedPointY > rectangle.y - 10 && selectedPointY < rectangle.y + 10 ||

            selectedPointX > rectangle.x + rectangle.width - 10 && selectedPointX < rectangle.x + rectangle.width + 10 &&
            selectedPointX > rectangle.y - 10 && selectedPointY < rectangle.y + 10 ||

            selectedPointX > rectangle.x + rectangle.width - 10 && selectedPointX < rectangle.x + rectangle.width + 10 &&
            selectedPointX > rectangle.y + rectangle.height - 10 && selectedPointY < rectangle.y + rectangle.height + 10 ||

            selectedPointX > rectangle.x - 10 && selectedPointX < rectangle.x + 10 &&
            selectedPointX > rectangle.y + rectangle.height - 10 && selectedPointY < rectangle.y + rectangle.height + 10


        );

    }


}

export default Rectangle;