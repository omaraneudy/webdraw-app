import Rectangle from "../models/Rectangle.js";
class HomeView {
    constructor() {
        this.shapeButtons = document.querySelectorAll(".shape-button");
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;

        this.selectedOption;

        this.rectangle = new Rectangle();

        this.creatingShape = false;
        this.selectingShape = false;

        this.selectedShape = undefined;
        this.workingShape = undefined;
        this.newPoints = undefined;
        this.canMove = false;

        this.detectedShape = undefined;

    }

    sayHello() {
        console.log(this.rectangle.rectangles);
    }

    detectShapeButton() {
        this.shapeButtons.forEach(shapeButton => {
            shapeButton.addEventListener("click", e => {
                switch (shapeButton.id) {
                    case "select":
                        this.selectedOption = "select";
                        break;
                    case "circle":
                        this.selectedOption = "circle";
                        break;
                    case "rectangle":
                        this.selectedOption = "rectangle";
                        console.log("rectangulooooo");
                        break;
                    case "line":
                        this.selectedOption = "line";
                        // isDrawingLine = true;
                        break;
                    case "free-hand":
                        this.selectedOption = "free-hand";
                        break;
                    default:
                        break;
                }

            });

        });

    }

    mouseDown() {
        document.addEventListener("mousedown", e => {
            switch (this.selectedOption) {
                case "select":
                    this.rectangle.selectedPointX = e.offsetX;
                    this.rectangle.selectedPointY = e.offsetY;

                    if (!this.workingShape && this.selectedShape) {

                        this.workingShape = this.rectangle.findShape(this.rectangle.selectedPointX, this.rectangle.selectedPointY, false);
                        // if (this.workingShape.id !== this.selectedShape.id)
                        //     this.workingShape = undefined;
                    }

                    if (this.workingShape) {
                        if (this.workingShape.id !== this.selectedShape.id)
                            this.workingShape = undefined;

                    }
                    
                    
                    this.selectedShape = this.rectangle.findShape(this.rectangle.selectedPointX, this.rectangle.selectedPointY);
                    
                    this.canMove = true;
                    break;
                case "rectangle":
                    this.rectangle.startPointX = e.offsetX;
                    this.rectangle.startPointY = e.offsetY;
                    this.creatingShape = true;
                    break;
                default:
                    break;
            }
        });
    }

    mouseUp() {
        document.addEventListener("mouseup", e => {
            this.creatingShape = false;

            if (this.selectedOption === "rectangle") {

                this.rectangle.addRectangle(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

                this.rectangle.x = null;
                this.rectangle.y = null;
                this.rectangle.width = null;
                this.rectangle.height = null;

            }
            if (this.selectedOption === "select") {
                this.sayHello();

                if (this.workingShape && this.newPoints) {
                    this.workingShape.x = this.newPoints.newPointX;
                    this.workingShape.y = this.newPoints.newPointY;
                    this.workingShape.width ??= this.newPoints.newWidth;
                    this.workingShape.height ??= this.newPoints.newHeight;

                    this.rectangle.rectangles.forEach(rectangle => {
                        if (rectangle.id ===  this.workingShape.id) {
                            rectangle = this.workingShape;
                            return;
                        }
                    });

                    this.newPoints = undefined;
                }

                this.workingShape = undefined;
                this.canMove = false;

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


            if (this.rectangle.findShape(e.offsetX, e.offsetY)) {
                this.detectedShape = this.rectangle.findShape(e.offsetX, e.offsetY);
            }

            if (this.creatingShape) {

                this.rectangle.x = this.rectangle.startPointX;
                this.rectangle.y = this.rectangle.startPointY;
                this.rectangle.width = e.offsetX - this.rectangle.x;
                this.rectangle.height = e.offsetY - this.rectangle.y;

                this.clearCanvas();

                this.rectangle.renderRectangles(this.rectangle.rectangles, this.ctx);

                this.ctx.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

            }
            if (this.workingShape && this.detectedShape) {

                this.newPoints = this.rectangle.changePosition(e, this.rectangle.selectedPointX, this.rectangle.selectedPointY, this.workingShape);
                this.clearCanvas();
                this.ctx.strokeRect(this.newPoints.newPointX, this.newPoints.newPointY, this.workingShape.width, this.workingShape.height);
                this.rectangle.renderRectangles(this.rectangle.rectangles, this.ctx, this.workingShape.id);
            }
            if (this.workingShape) {
                this.newPoints = this.rectangle.changeSize(e, this.rectangle.selectedPointX, this.rectangle.selectedPointY, this.workingShape);
                console.log(this.newPoints, this.workingShape, e);
                this.clearCanvas();
                this.ctx.strokeRect(this.newPoints.newPointX, this.newPoints.newPointY, this.newPoints.newWidth, this.newPoints.newHeight);
                this.rectangle.renderRectangles(this.rectangle.rectangles, this.ctx, this.workingShape.id);
                return;
            }




        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default HomeView;