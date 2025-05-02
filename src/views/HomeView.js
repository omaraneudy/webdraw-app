import Rectangle from "../models/Rectangle.js";
class HomeView {
    constructor() {
        this.shapeButtons = document.querySelectorAll(".shape-button");
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;

        this.fillButtons = document.querySelectorAll(".fill-button");
        this.fillColor = "#00000000";

        this.strokeButtons = document.querySelectorAll(".stroke-button");
        this.strokeColor = "#000000";

        this.lineWidthButtons = document.querySelectorAll(".line-width-button");
        this.lineWidth = 1;

        this.selectedOption;

        this.rectangle = new Rectangle(this.canvas, this.ctx);

        this.creatingShape = false;
        this.selectingShape = false;

        this.selectedShape = undefined;
        this.workingShape = undefined;
        this.newPoints = undefined;
        this.selectMode = "move";

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
        canvas.addEventListener("mousedown", e => {
            switch (this.selectedOption) {
                case "select":
                    this.rectangle.selectedPointX = e.offsetX;
                    this.rectangle.selectedPointY = e.offsetY;

                    this.selectMode = "move";
                    let shapeSide;

                    this.selectedShape = this.rectangle.findShape(this.rectangle.selectedPointX, this.rectangle.selectedPointY);
                    if (this.selectedShape) {
                        shapeSide = this.rectangle.detectArea(this.rectangle.selectedPointX, this.rectangle.selectedPointY, this.selectedShape);

                    }

                    if (this.workingShape && this.selectedShape && this.selectedShape.id === this.workingShape.id) {

                        if (shapeSide.side === "center") {
                            this.selectMode = "move";
                        }
                        else if (shapeSide.side === "top" || shapeSide.side === "right" ||
                            shapeSide.side === "bottom" || shapeSide.side === "left") {
                            this.selectMode = "changeSize";

                        }
                    }
                    this.workingShape = this.selectedShape;
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
        this.fillButtons.forEach(fillButton => {
            fillButton.addEventListener("click", e => {
                this.fillColor = this.rgbaToHex(getComputedStyle(fillButton).backgroundColor).toString();

                if (this.selectedOption === "select" && this.workingShape) {
                    this.rectangle.rectangles.forEach(rectangle => {
                        if (rectangle.id === this.workingShape.id) {
                            rectangle.fill = true;
                            rectangle.fillColor = this.fillColor;
                            return;
                        }
                    });

                    this.rectangle.renderRectangles();
                    this.rectangle.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
                }
            });
        });

        this.strokeButtons.forEach(strokeButton => {
            strokeButton.addEventListener("click", e => {
                this.strokeColor = this.rgbaToHex(getComputedStyle(strokeButton).backgroundColor).toString();
                console.log("strokee colorrrr");

                if (this.selectedOption === "select" && this.workingShape) {
                    this.rectangle.rectangles.forEach(rectangle => {
                        if (rectangle.id === this.workingShape.id) {
                            rectangle.strokeColor = this.strokeColor;
                            return;
                        }
                    });

                    this.rectangle.renderRectangles();
                    this.rectangle.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
                }
            });
        });

        this.lineWidthButtons.forEach(lineWidthButton => {
            lineWidthButton.addEventListener("click", () => {
                this.lineWidth = 1;
                if (lineWidthButton.id === "bold-width") {
                    this.lineWidth = 4;
                }
                else if (lineWidthButton.id === "extra-bold-width") {
                    this.lineWidth = 8;
                }
                if (this.selectedOption === "select" && this.workingShape) {
                    this.rectangle.rectangles.forEach(rectangle => {
                        if (rectangle.id === this.workingShape.id) {
                            rectangle.lineWidth = this.lineWidth;
                            return;
                        }
                    });

                    this.rectangle.renderRectangles();
                    this.rectangle.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
                }

            });
        });

    }

    mouseUp() {
        document.addEventListener("mouseup", e => {
            this.creatingShape = false;

            if (this.selectedOption === "rectangle") {

                let isFill = true;
                if (this.fillColor === "#00000000") isFill = false;

                this.rectangle.addRectangle(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height, isFill, this.fillColor, this.strokeColor, this.lineWidth);

            }
            if (this.selectedOption === "select") {
                this.sayHello();

                if (this.workingShape && this.newPoints) {

                    if (this.newPoints.newWidth < 0) {
                        this.newPoints.newPointX += this.newPoints.newWidth;
                        this.newPoints.newWidth = Math.abs(this.newPoints.newWidth);
                    }

                    if (this.newPoints.newHeight < 0) {
                        this.newPoints.newPointY += this.newPoints.newHeight;
                        this.newPoints.newHeight = Math.abs(this.newPoints.newHeight);
                    }

                    this.workingShape.x = this.newPoints.newPointX;
                    this.workingShape.y = this.newPoints.newPointY;
                    this.workingShape.width = this.newPoints.newWidth;
                    this.workingShape.height = this.newPoints.newHeight;
                    //this.workingShape.fillColor = this.fillColor;


                    this.rectangle.rectangles.forEach(rectangle => {
                        if (rectangle.id === this.workingShape.id) {
                            rectangle = this.workingShape;
                            return;
                        }
                    });

                    this.newPoints = undefined;
                }
                this.selectMode = "";
            }
        })
    }

    mouseMove() {
        document.addEventListener("mousemove", e => {

            this.detectedShape = this.rectangle.findShape(e.offsetX, e.offsetY);
            this.canvas.style.cursor = "default";
            if (this.detectedShape && this.selectedOption === "select") {
                let shapeSide = this.rectangle.detectArea(e.offsetX, e.offsetY, this.detectedShape);
                
                if (shapeSide.side === "top" && this.workingShape && shapeSide.id === this.workingShape.id){
                    this.canvas.style.cursor = "n-resize";
                }
                else if (shapeSide.side === "right" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "e-resize";
                }
                else if (shapeSide.side === "bottom" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "s-resize";
                }
                else if (shapeSide.side === "left" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "w-resize";
                }
                else if (shapeSide.side === "center") {
                    this.canvas.style.cursor = "move";
                }
                else {
                    this.canvas.style.cursor = "default";
                }
            }
            if (this.creatingShape) {
                
                this.rectangle.x = this.rectangle.startPointX;
                this.rectangle.y = this.rectangle.startPointY;
                this.rectangle.width = e.offsetX - this.rectangle.x;
                this.rectangle.height = e.offsetY - this.rectangle.y;

                this.rectangle.renderRectangles();

                if (this.fillColor !== "#00000000") {
                    this.ctx.fillStyle = this.fillColor;
                    this.ctx.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
                }
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

            }

            if (this.workingShape && this.selectMode === "move") {
                this.newPoints = this.rectangle.changePosition(e, this.rectangle.selectedPointX, this.rectangle.selectedPointY, this.workingShape);
                this.rectangle.renderRectangles(this.workingShape, this.newPoints);

            }
            if (this.workingShape && this.selectMode === "changeSize") {
                this.newPoints = this.rectangle.changeSize(e, this.rectangle.selectedPointX, this.rectangle.selectedPointY, this.workingShape);
                this.rectangle.renderRectangles(this.workingShape, this.newPoints);

            }
        });
    }

    rgbaToHex(rgba) {
        const result = rgba.match(/\d+(\.\d+)?/g); // Extrae números incluyendo decimales

        if (!result) return "#000000";

        const r = parseInt(result[0]).toString(16).padStart(2, '0');
        const g = parseInt(result[1]).toString(16).padStart(2, '0');
        const b = parseInt(result[2]).toString(16).padStart(2, '0');

        // Si hay un valor alfa (transparencia), lo convertimos también
        const a = result[3] !== undefined
            ? Math.round(parseFloat(result[3]) * 255).toString(16).padStart(2, '0')
            : "ff"; // Si no hay alfa, se asume totalmente opaco

        return `#${r}${g}${b}${a}`;
    }


}

export default HomeView;