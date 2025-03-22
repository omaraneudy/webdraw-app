const canvas = document.getElementById("canvas");
const dif = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const circleButton = document.getElementById("circle");
const squareButton = document.getElementById("square");
const lineButton = document.getElementById("line");

const shapeButtons = document.querySelectorAll(".shape-button");

let selectedShape;
let isDrawingLine = false;
let isDrawing = false;
let startPointX;
let startPointY;

let startSelectPointX;
let startSelectPointY;

canvas.width = screen.width;
canvas.height = screen.height;


let xRect, yRect, widthRect, heightRect;
let xRectSelect, yRectSelect, widthRectSelect, heightRectSelect;


let rectangles = [];

console.log(dif.x+" x ");
console.log(dif.y+" y ");

shapeButtons.forEach(shapeButton => {
    shapeButton.addEventListener("click", e => {
        ctx.closePath();
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
        console.log("desde foreach "+shapeButton.id+" forma seleccionada "+selectedShape);
        e.stopPropagation();

    })
})

let testSquare = false;
let testSquarePointX = null;
let testSquarePointY = null;

let testSelect = false;
let selectPointX = null;
let selectPointY = null;

document.addEventListener("mousedown", e => {
    switch (selectedShape) {
        case "circle":
            break;
        case "square":
            // ctx.strokeRect(e.clientX, e.clientY, 100, 60);
            testSquarePointX = e.offsetX;
            testSquarePointY = e.offsetY;
            testSquare = true;
            break;
        case "line":
            console.log("we're in line case");
            selectPointX = e.offsetX;
            selectPointY = e.offsetY;
            testSelect = true;
            break;
        case "free-hand":
            break;
        default:
            break;
    }
            //ctx.lineTo(e.clientX,e.clientY);
})
        
document.addEventListener("mouseup", e => {
    isDrawingLine = false;
    isDrawing = false;
    testSquare = false;
    testSelect = false;
    ctx.closePath();

    if (selectedShape === "square"){
        rectangles.push(
        {
            x: xRect,
            y: yRect,
            width: widthRect,
            height: heightRect
        });

        xRect = null;
        yRect = null;
        widthRect = null;
        heightRect = null;

    }



})
const ctx2 = canvas.getContext("2d");
const ctx3 = canvas.getContext("2d");
document.addEventListener("mousemove", e => {
    if (testSquare) {
        xRect = testSquarePointX;
        yRect = testSquarePointY;
        widthRect = e.offsetX-testSquarePointX;
        heightRect = e.offsetY-testSquarePointY;

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
        widthRectSelect = e.offsetX-selectPointX;
        heightRectSelect = e.offsetY-selectPointY;
        
        ctx2.clearRect(0, 0, 10000, 10000);
        // ctx2.clearRect(xRectSelect+1, yRectSelect+1, widthRectSelect+1, heightRectSelect+1);
        


        rectangles.forEach(rectangle => {
            // ctx.strokeStyle = "black";
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
        
        ctx2.strokeStyle = "blue";
        ctx2.strokeRect(xRectSelect, yRectSelect, widthRectSelect, heightRectSelect);
        // ctx2.strokeText(`x=${xRectSelect}, y=${yRectSelect}`,xRectSelect, yRectSelect);
        ctx2.strokeText(`x=${e.offsetX}, y=${e.offsetY}`,e.offsetX, e.offsetY);
        //console.log(xRectSelect, yRectSelect, widthRectSelect, heightRectSelect);
        
        rectangle = rectangles.filter(rectangle => 
            rectangle.x < xRectSelect + widthRectSelect &&
            rectangle.x + rectangle.width > xRectSelect &&
            rectangle.y < yRectSelect + heightRectSelect &&
            rectangle.y + rectangle.height > yRectSelect
        )

        //si xrectangulo se encuentra entre xinicial y xfinal
        
        
        if (rectangle.length > 0){
            ctx3.beginPath();
            console.log(rectangle);
            // ctx3.strokeStyle = "red";
            ctx3.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            ctx3.strokeText(`x=${rectangle.x}, y=${rectangle.y}`,rectangle.x, rectangle.y);
            //testSelect = false;


        }

    }

    
})