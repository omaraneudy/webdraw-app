class HomeView {
    constructor() {
        this.shapeButtons = document.querySelectorAll(".shape-button");
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;

    }

    detectShapeButton() {
        let selectedShape = "";
        shapeButtons.forEach(shapeButton => {
            shapeButton.addEventListener("click", () => {
                switch (shapeButton.id) {
                    case "circle":
                        selectedShape = "circle";
                        break;
                    case "square":
                        selectedShape = "square";
                        break;
                    case "line":
                        selectedShape = "line";
                        isDrawingLine = true;
                        break;
                    case "free-hand":
                        selectedShape = "free-hand";
                        break;
                    default:
                        break;
                }
            });
        });
        return selectedShape;
    }


    mouseUp() {
        document.addEventListener("mouseup", e => {
            isDrawingLine = false;
            isDrawing = false;
            testSquare = false;
            testSelect = false;

            if (selectedShape === "square") {

                if (widthRect < 0 && heightRect < 0) {
                    xRect += widthRect;
                    yRect += heightRect;
                    widthRect = Math.abs(widthRect);
                    heightRect = Math.abs(heightRect);
                }

                if (xRect && yRect && widthRect && heightRect) {

                    rectangleId += 1;

                    if (rectangles.length == 0) {
                        rectangleId = 0;
                    }

                    rectangles.push(
                        {
                            id: rectangleId,
                            x: xRect,
                            y: yRect,
                            width: widthRect,
                            height: heightRect
                        }
                    );

                    xRect = null;
                    yRect = null;
                    widthRect = null;
                    heightRect = null;
                }


            }
            if (selectedRectangle && newPointX && newPointY && newHeight) {

                if (newHeight < 0) {
                    //newPointX += widthRect;
                    newPointY += newHeight;
                    //widthRect = Math.abs(widthRect);
                    newHeight = Math.abs(newHeight);
                }

                selectedRectangle.x = newPointX;
                selectedRectangle.y = newPointY;
                selectedRectangle.height = newHeight;

                rectangles.forEach(rectangle => {
                    if (rectangle.id === selectedRectangle.id) {
                        rectangle = selectedRectangle;
                        console.log(rectangle);
                        return;
                    }
                });
            }
            isSelected = false;
            newPointX = undefined;
            newPointY = undefined;
            changingHeight = false;
            canMove = false;

        });
    }

    mouseMove() {
        document.addEventListener("mousemove", e => {
            if (testSquare) {
                xRect = testSquarePointX;
                yRect = testSquarePointY;
                widthRect = e.offsetX - testSquarePointX;
                heightRect = e.offsetY - testSquarePointY;
        
                ctx.clearRect(0, 0, 10000, 10000);
        
                rectangles.forEach(rectangle => {
                    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                });
                ctx.strokeRect(xRect, yRect, widthRect, heightRect);
                //ctx.strokeRect(testSquarePointX,testSquarePointY,e.offsetX-testSquarePointX,e.offsetY-testSquarePointY);
        
            }
        
            if (testSelect) {
                xRectSelect = selectPointX;
                yRectSelect = selectPointY;
                widthRectSelect = e.offsetX - selectPointX;
                heightRectSelect = e.offsetY - selectPointY;
        
                ctx.clearRect(0, 0, 10000, 10000);
        
        
        
                rectangles.forEach(rectangle => {
                    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                });
        
                ctx.strokeText(`x=${e.offsetX}, y=${e.offsetY}`, e.offsetX, e.offsetY);
        
        
        
            }
            if (isSelected && selectedRectangle) {
                //newWidth = e.offsetX - (xRectSelect - selectedRectangle.x);
                newPointX = selectedRectangle.x;
                newPointY = e.offsetY;
                newHeight = (selectedRectangle.y - e.offsetY) + selectedRectangle.height;
        
                ctx.clearRect(0, 0, 10000, 10000);
                ctx.strokeRect(selectedRectangle.x, newPointY, selectedRectangle.width, newHeight);
        
                rectangles.forEach(rectangle => {
                    if (rectangle.id === selectedRectangle.id)
                        return;
                    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                });
        
                return;
        
            }
        
            if (selectedRectangle && canMove) {
        
                newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
                newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);
                
                this.clearCanvas();
        
                ctx.strokeRect(newPointX, newPointY, selectedRectangle.width, selectedRectangle.height);
        
                rectangles.forEach(rectangle => {
                    if (rectangle.id === selectedRectangle.id)
                        return;
                    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                });
            }
        
        
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default HomeView;