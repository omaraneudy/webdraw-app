import Rectangle from "../models/Rectangle.js";
import HomeModel from "../models/HomeModel.js";
//import HomeView from "../views/HomeView.js";
import HomeView from "../views/HomeView copy.js";

class HomeController {
    constructor() {

        this.model = new HomeModel();
        this.view = new HomeView();

        this.id = this.setMaxId();
        this.view.getShapes(this.model.getShapes());

        this.view.renderRectangles();
        this.view.detectShapeButton()
        this.view.mouseDown(this.findShape.bind(this), this.detectArea.bind(this), this.updateShape.bind(this));
        this.view.mouseMove(this.findShape.bind(this), this.detectArea.bind(this), this.changeSize.bind(this), this.changePosition.bind(this));
        //this.view.mouseUp();
        this.view.mouseUp(this.addRectangle.bind(this), this.updateShape.bind(this));

    }

    setMaxId() {
        //return this.model.getShapes().filter((shape))
        return Math.max(...this.model.getShapes().map(o => o.id))
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

    updateShape(newShape, layer = undefined) {

        let actualLayer = this.model.getShapes().indexOf(newShape);
        let newLayer = undefined;
        if (layer) {
            
            //let actualLayer = this.shapes.indexOf(newShape);
            if (layer === "front-layer") {
                if (actualLayer < this.model.getShapes().length - 1) {
                    newLayer = actualLayer + 1;
                }
            }
            else if (layer === "back-layer") {
                if (actualLayer > 0) {
                    newLayer = actualLayer - 1;
                }
            }

            // this.model.getShapes()[actualLayer] = this.model.getShapes()[newLayer];
            // this.model.getShapes()[newLayer] = newShape;
        }
        this.model.updateShape(newShape, actualLayer, newLayer);
        this.view.getShapes(this.model.getShapes());
    }

    addRectangle(x, y, width, height, fill = false, fillColor = '#ffffff00',
        strokeColor = '#000000', lineWidth = 1, type = "rectangle") {

        if (width < 0 && height < 0) {

            x += width;
            y += height;
            width = Math.abs(width);
            height = Math.abs(height);
        }

        if (x && y && width && height) {

            this.id += 1;

            if (this.model.getShapes().length == 0) {
                this.id = 0;
            }

            this.model.addShape(
                {
                    id: this.id,
                    x,
                    y,
                    width,
                    height,
                    type,
                    fill,
                    fillColor,
                    strokeColor,
                    lineWidth
                }
            );
        }
    }

    changeSize(e, selectedPointX, selectedPointY, selectedRectangle) {

        let newPointX = selectedRectangle.x;
        let newPointY = selectedRectangle.y;
        let newWidth = selectedRectangle.width;
        let newHeight = selectedRectangle.height;
        let styleCursor = "";

        // Top Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointX = e.offsetX;
            newPointY = e.offsetY;
            newWidth = (selectedPointX - e.offsetX) + selectedRectangle.width;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;
            styleCursor = "nw-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        // Top Right
        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointY = e.offsetY;
            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;
            styleCursor = "ne-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };

        }

        // Bottom Right 

        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;
            newHeight = (e.offsetY - selectedPointY) + selectedRectangle.height;
            styleCursor = "se-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        // Bottom Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newPointX = e.offsetX;
            newWidth = (selectedPointX - e.offsetX) + selectedRectangle.width;
            newHeight = (e.offsetY - selectedPointY) + selectedRectangle.height;
            styleCursor = "sw-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }
        // Top

        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            newPointY = e.offsetY;
            newHeight = (selectedPointY - e.offsetY) + selectedRectangle.height;
            styleCursor = "n-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        // Right
        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newWidth = (e.offsetX - selectedPointX) + selectedRectangle.width;
            styleCursor = "e-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        // Bottom
        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newHeight = (e.offsetY - selectedPointY) + selectedRectangle.height;
            styleCursor = "s-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        // Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            newPointX = e.offsetX;
            newWidth = (selectedPointX - e.offsetX) + selectedRectangle.width;
            styleCursor = "w-resize";

            return { newPointX, newPointY, newWidth, newHeight, styleCursor };
        }

        return { newPointX, newPointY, newWidth, newHeight, styleCursor };
    }

    changePosition(e, xRectSelect, yRectSelect, selectedRectangle) {
        let newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
        let newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);
        let newWidth = selectedRectangle.width;
        let newHeight = selectedRectangle.height;

        //this.canvas.style.cursor = "move";

        return { newPointX, newPointY, newWidth, newHeight };
    }

    findShape(selectedPointX, selectedPointY, workingShape = undefined) {
        // if (border)
        if (workingShape) {
            if (selectedPointX > workingShape.x - 10 && selectedPointX < workingShape.width + workingShape.x + 10
            && selectedPointY > workingShape.y - 10 && selectedPointY < workingShape.y + 10 ||

            // Right
            selectedPointX > workingShape.x + workingShape.width - 10 && selectedPointX < workingShape.x + workingShape.width + 10 &&
            selectedPointY > workingShape.y - 10 && selectedPointY < workingShape.y + workingShape.height + 10 ||

            // Bottom
            selectedPointX > workingShape.x - 10 && selectedPointX < workingShape.width + workingShape.x + 10
            && selectedPointY > workingShape.y + workingShape.height - 10 && selectedPointY < workingShape.y + workingShape.height + 10 ||

            // Left
            selectedPointX > workingShape.x - 10 && selectedPointX < workingShape.x + 10 &&
            selectedPointY > workingShape.y - 10 && selectedPointY < workingShape.y + workingShape.height + 10 ||

            // Center
            selectedPointX > workingShape.x && selectedPointX < workingShape.width + workingShape.x
            && selectedPointY > workingShape.y && selectedPointY < workingShape.y + workingShape.height)
            {
                return workingShape;
            }
        }
        return this.model.getShapes().findLast(rectangle =>
            selectedPointX > rectangle.x - 10 && selectedPointX < rectangle.width + rectangle.x + 10
            && selectedPointY > rectangle.y - 10 && selectedPointY < rectangle.y + 10 ||

            // Right
            selectedPointX > rectangle.x + rectangle.width - 10 && selectedPointX < rectangle.x + rectangle.width + 10 &&
            selectedPointY > rectangle.y - 10 && selectedPointY < rectangle.y + rectangle.height + 10 ||

            // Bottom
            selectedPointX > rectangle.x - 10 && selectedPointX < rectangle.width + rectangle.x + 10
            && selectedPointY > rectangle.y + rectangle.height - 10 && selectedPointY < rectangle.y + rectangle.height + 10 ||

            // Left
            selectedPointX > rectangle.x - 10 && selectedPointX < rectangle.x + 10 &&
            selectedPointY > rectangle.y - 10 && selectedPointY < rectangle.y + rectangle.height + 10 ||

            // Center
            selectedPointX > rectangle.x && selectedPointX < rectangle.width + rectangle.x
            && selectedPointY > rectangle.y && selectedPointY < rectangle.y + rectangle.height

        );

        // return this.rectangles.find(rectangle => selectedPointX > rectangle.x && selectedPointX < rectangle.width + rectangle.x
        //     && selectedPointY > rectangle.y && selectedPointY < rectangle.y + rectangle.height);

    }

    detectArea(selectedPointX, selectedPointY, selectedRectangle, corners = false) {

        // x - 10 && x + 10
        // y - 10 && y + 10

        // x + width - 10 && x + width + 10
        // y - 10 && y + 10

        // x + width - 10 && x + width + 10
        // y + height - 10 && y + height + 10

        // x - 10 && x + 10
        // y + height - 10 && y + height + 10

        if (corners) {
            // Top Left
            if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
                selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

                return { id: selectedRectangle.id, side: "top-left" };
            }

            // Top Right
            if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
                selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

                return { id: selectedRectangle.id, side: "top-right" };
            }

            // Bottom Right 

            if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
                selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

                return { id: selectedRectangle.id, side: "bottom-right" };
            }

            // Bottom Left
            if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
                selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

                return { id: selectedRectangle.id, side: "bottom-left" };
            }
        }

        // Top
        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + 10) {

            return { id: selectedRectangle.id, side: "top" };
        }

        // Right
        if (selectedPointX > selectedRectangle.x + selectedRectangle.width - 10 && selectedPointX < selectedRectangle.x + selectedRectangle.width + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            return { id: selectedRectangle.id, side: "right" };
        }

        // Bottom
        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y + selectedRectangle.height - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            return { id: selectedRectangle.id, side: "bottom" };
        }

        // Left
        if (selectedPointX > selectedRectangle.x - 10 && selectedPointX < selectedRectangle.x + 10 &&
            selectedPointY > selectedRectangle.y - 10 && selectedPointY < selectedRectangle.y + selectedRectangle.height + 10) {

            return { id: selectedRectangle.id, side: "left" };
        }

        // Center
        if (selectedPointX > selectedRectangle.x && selectedPointX < selectedRectangle.width + selectedRectangle.x
            && selectedPointY > selectedRectangle.y && selectedPointY < selectedRectangle.y + selectedRectangle.height) {
            return { id: selectedRectangle.id, side: "center" };
        }

        return { id: "", side: "" };

    }

}

export default HomeController;

