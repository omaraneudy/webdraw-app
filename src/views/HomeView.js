import Rectangle from "../models/Rectangle.js";
class HomeView {
    constructor() {
        this.shapeButtons = document.querySelectorAll(".shape-button");
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;

        this.selectedShape;

        this.rectangle = new Rectangle();

        this.creatingRectangle = false;

    }

    sayHello() {
        console.log(this.rectangle.rectangles);
    }

    detectShapeButton() {
        this.shapeButtons.forEach(shapeButton => {
            shapeButton.addEventListener("click", e => {
                switch (shapeButton.id) {
                    case "circle":
                        this.selectedShape = "circle";
                        break;
                    case "rectangle":
                        this.selectedShape = "rectangle";
                        console.log("rectangulooooo");
                        break;
                    case "line":
                        this.selectedShape = "line";
                        // isDrawingLine = true;
                        break;
                    case "free-hand":
                        this.selectedShape = "free-hand";
                        break;
                    default:
                        break;
                }

            });

        });

    }

    mouseDown() {
        document.addEventListener("mousedown", e => {
            switch (this.selectedShape) {
                case "rectangle":
                    this.rectangle.startPointX = e.offsetX;
                    this.rectangle.startPointY = e.offsetY;
                    this.creatingRectangle = true;
                    console.log("mousedown holaaa");
                    break;
                default:
                    break;
            }
        });
    }

    mouseUp() {
        document.addEventListener("mouseup", e => {
            this.creatingRectangle = false;

            if (this.selectedShape === "rectangle") {

                this.rectangle.addRectangle(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

                this.rectangle.x = null;
                this.rectangle.y = null;
                this.rectangle.width = null;
                this.rectangle.height = null;

            }
            //this.sayHello();
            // if (selectedRectangle && newPointX && newPointY && newHeight) {

            //     if (newHeight < 0) {
            //         //newPointX += widthRect;
            //         newPointY += newHeight;
            //         //widthRect = Math.abs(widthRect);
            //         newHeight = Math.abs(newHeight);
            //     }

            //     selectedRectangle.x = newPointX;
            //     selectedRectangle.y = newPointY;
            //     selectedRectangle.height = newHeight;

            //     rectangles.forEach(rectangle => {
            //         if (rectangle.id === selectedRectangle.id) {
            //             rectangle = selectedRectangle;
            //             console.log(rectangle);
            //             return;
            //         }
            //     });
            // }
            // isSelected = false;
            // newPointX = undefined;
            // newPointY = undefined;
            // changingHeight = false;
            // canMove = false;

        })
    }

    mouseMove() {
        document.addEventListener("mousemove", e => {
            if (this.creatingRectangle) {

                this.rectangle.x = this.rectangle.startPointX;
                this.rectangle.y = this.rectangle.startPointY;
                this.rectangle.width = e.offsetX - this.rectangle.x;
                this.rectangle.height = e.offsetY - this.rectangle.y;
                console.log("moving");
                this.clearCanvas();
                this.rectangle.renderRectangles(this.rectangle.rectangles, this.ctx);
                this.ctx.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

            }

            // if (selectedRectangle && canMove) {

            //     newPointX, newPointY = this.rectangle.changePosition(e, xRectSelect, yRectSelect, selectedRectangle);
            //     console.log("hola", newPointX, newPointY);
            //     this.clearCanvas();
            //     ctx.strokeRect(newPointX, newPointY, selectedRectangle.width, selectedRectangle.height);        
            //     this.rectangle.renderRectangles(rectangles, this.ctx, selectedRectangle.id);

            // }
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default HomeView;