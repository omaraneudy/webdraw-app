//https://gist.github.com/robnyman/1875132 -- guardar imagen

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

        this.layerButtons = document.querySelectorAll(".layer-button");
        this.actualLayer = 0;
        this.newLayer = 0;

        this.saveImage = document.getElementById("save-image");

        this.selectedOption;

        //this.rectangle = new Rectangle(this.canvas, this.ctx);
        this.shapes = [];

        this.vista = "por defecto";

        this.creatingShape = false;
        this.selectingShape = false;

        this.selectedShape = undefined;
        this.workingShape = undefined;
        this.newPoints = undefined;
        this.selectMode = "move";

        this.detectedShape = undefined;

        ///////////////////////////

        this.id = 0;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        this.startPointX = 0;
        this.startPointY = 0;

        this.selectedPointX = null;
        this.selectedPointY = null;
        /////////////////////////////

    }

    getShapes(shapes) {
        this.shapes = shapes;
    }

    sayHello() {
        console.log(this.shapes);
    }

    options() {
        this.saveImage.addEventListener("click", e => {
            var canvas = document.getElementsByTagName("canvas");
            // canvas context
            var context = canvas[0].getContext("2d");
            // store the current globalCompositeOperation
            var compositeOperation = context.globalCompositeOperation;
            // set to draw behind current content
            context.globalCompositeOperation = "destination-over";
            //set background color
            context.fillStyle = "#FFFFFF";
            // draw background/rectangle on entire canvas
            context.fillRect(0, 0, canvas[0].width, canvas[0].height);

            var tempCanvas = document.createElement("canvas"),
                tCtx = tempCanvas.getContext("2d");

            tempCanvas.width = canvas[0].width;
            tempCanvas.height = canvas[0].height;

            tCtx.drawImage(canvas[0], 0, 0);

            let imagenPrueba = tempCanvas.toDataURL("image/png");
            console.log(imagenPrueba);
            this.saveImage.download = 'imagenPrueba.png';
            this.saveImage.href = imagenPrueba;
            context.globalCompositeOperation = "source-over";
            
        })
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

    mouseDown(findShapeHandler, detectAreaHandler, updateShapeHandler) {
        let newShape = undefined;
        canvas.addEventListener("mousedown", e => {
            switch (this.selectedOption) {
                case "select":
                    this.selectedPointX = e.offsetX;
                    this.selectedPointY = e.offsetY;

                    this.selectMode = "move";
                    let shapeSide;

                    this.selectedShape = findShapeHandler(this.selectedPointX, this.selectedPointY, this.workingShape);
                    if (this.selectedShape) {
                        shapeSide = detectAreaHandler(this.selectedPointX, this.selectedPointY, this.selectedShape);
                        this.renderRectangles();
                        this.selectionRectangle(this.selectedShape.x, this.selectedShape.y, this.selectedShape.width, this.selectedShape.height);
                    }
                    else {
                        this.renderRectangles();
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
                    this.startPointX = e.offsetX;
                    this.startPointY = e.offsetY;
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

                    newShape = this.workingShape;
                    newShape.fill = true;
                    newShape.fillColor = this.fillColor;
                    updateShapeHandler(newShape);
                    newShape = undefined;

                    this.renderRectangles();
                    this.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
                }
            });
        });

        this.strokeButtons.forEach(strokeButton => {
            strokeButton.addEventListener("click", e => {
                this.strokeColor = this.rgbaToHex(getComputedStyle(strokeButton).backgroundColor).toString();
                console.log("strokee colorrrr");

                if (this.selectedOption === "select" && this.workingShape) {

                    newShape = this.workingShape;
                    newShape.strokeColor = this.strokeColor;
                    updateShapeHandler(newShape);
                    newShape = undefined;

                    this.renderRectangles();
                    this.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
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

                    newShape = this.workingShape;
                    newShape.lineWidth = this.lineWidth;
                    updateShapeHandler(newShape);
                    newShape = undefined;

                    this.renderRectangles();
                    this.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);
                }

            });
        });

        this.layerButtons.forEach(layerButton => {
            layerButton.addEventListener("click", () => {
                if (this.selectedOption === "select" && this.workingShape) {

                    this.actualLayer = this.shapes.indexOf(this.workingShape);
                    updateShapeHandler(this.workingShape, layerButton.id);
                    this.renderRectangles();
                    this.selectionRectangle(this.workingShape.x, this.workingShape.y, this.workingShape.width, this.workingShape.height);

                }
            });
        });
    }

    mouseUp(addShapeHandler, updateShapeHandler) {
        document.addEventListener("mouseup", e => {
            this.creatingShape = false;

            if (this.selectedOption === "rectangle") {

                let isFill = true;
                if (this.fillColor === "#00000000") isFill = false;
                addShapeHandler(this.x, this.y, this.width, this.height, isFill, this.fillColor, this.strokeColor, this.lineWidth);
                this.x = null;
                this.y = null;
                this.width = null;
                this.height = null;

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

                    updateShapeHandler(this.workingShape);

                    this.newPoints = undefined;
                }
                this.selectMode = "";
            }
        })
    }

    mouseMove(findShapeHandler, detectAreaHandler, changeSizeHandler, changePositionHandler) {
        document.addEventListener("mousemove", e => {

            this.detectedShape = findShapeHandler(e.offsetX, e.offsetY);
            this.canvas.style.cursor = "default";
            if (this.detectedShape && this.selectedOption === "select") {

                let shapeSide = { side: "" };//= detectAreaHandler(e.offsetX, e.offsetY, this.detectedShape, true);
                if (this.workingShape) {
                    shapeSide = detectAreaHandler(e.offsetX, e.offsetY, this.workingShape, true);
                }
                if (shapeSide.side === "") {
                    shapeSide = detectAreaHandler(e.offsetX, e.offsetY, this.detectedShape, true);

                }

                if (shapeSide.side === "top-left" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "nw-resize";
                }
                else if (shapeSide.side === "top-right" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "ne-resize";
                }
                else if (shapeSide.side === "bottom-right" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "se-resize";
                }
                else if (shapeSide.side === "bottom-left" && this.workingShape && shapeSide.id === this.workingShape.id) {
                    this.canvas.style.cursor = "sw-resize";
                }
                else if (shapeSide.side === "top" && this.workingShape && shapeSide.id === this.workingShape.id) {
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

                this.x = this.startPointX;
                this.y = this.startPointY;
                this.width = e.offsetX - this.x;
                this.height = e.offsetY - this.y;

                this.renderRectangles();

                if (this.fillColor !== "#00000000") {
                    this.ctx.fillStyle = this.fillColor;
                    this.ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);

            }

            if (this.workingShape && this.selectMode === "move") {
                this.newPoints = changePositionHandler(e, this.selectedPointX, this.selectedPointY, this.workingShape);
                this.canvas.style.cursor = "move";
                this.renderRectangles(this.workingShape, this.newPoints);

            }
            if (this.workingShape && this.selectMode === "changeSize") {
                this.newPoints = changeSizeHandler(e, this.selectedPointX, this.selectedPointY, this.workingShape);
                this.canvas.style.cursor = this.newPoints.styleCursor;
                this.renderRectangles(this.workingShape, this.newPoints);

            }
        });
    }

    renderRectangles(workingShape = undefined, newPoints = undefined) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes.forEach(rectangle => {
            if (workingShape && rectangle.id === workingShape.id) {
                if (workingShape && newPoints) {
                    if (workingShape.fill) {
                        this.ctx.fillStyle = workingShape.fillColor;
                        this.ctx.fillRect(newPoints.newPointX, newPoints.newPointY, newPoints.newWidth, newPoints.newHeight);
                    }
                    this.ctx.strokeStyle = workingShape.strokeColor;
                    this.ctx.lineWidth = workingShape.lineWidth;
                    this.ctx.strokeRect(newPoints.newPointX, newPoints.newPointY, newPoints.newWidth, newPoints.newHeight);
                }
                return;
            }
            if (rectangle.fill) {
                this.ctx.fillStyle = rectangle.fillColor;
                this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            }
            this.ctx.strokeStyle = rectangle.strokeColor;
            this.ctx.lineWidth = rectangle.lineWidth;
            this.ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
        if (workingShape && newPoints) {
            this.selectionRectangle(newPoints.newPointX, newPoints.newPointY, newPoints.newWidth, newPoints.newHeight);
        }
    }

    selectionRectangle(x, y, width, height) {

        if (width < 0) {
            x += width;
            width = Math.abs(width);
        }
        if (height < 0) {
            y += height;
            height = Math.abs(height);
        }

        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = '#090cd9';
        this.ctx.strokeRect(x - 5, y - 5, width + 10, height + 10);
        this.ctx.fillStyle = 'white';

        this.ctx.fillRect(x - 8, y - 8, 7, 7);
        this.ctx.strokeRect(x - 8, y - 8, 7, 7);

        this.ctx.fillRect(x + width + 2, y - 8, 7, 7);
        this.ctx.strokeRect(x + width + 2, y - 8, 7, 7);

        this.ctx.fillRect(x + width + 2, y + height + 2, 7, 7);
        this.ctx.strokeRect(x + width + 2, y + height + 2, 7, 7);

        this.ctx.fillRect(x - 8, y + height + 2, 7, 7);
        this.ctx.strokeRect(x - 8, y + height + 2, 7, 7);
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