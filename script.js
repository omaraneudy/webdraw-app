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

canvas.width = screen.width;
canvas.height = screen.height;



ctx.strokeRect(30, 40, 20, 20);

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

document.addEventListener("mousedown", e => {
    console.log(e.clientX);
    ctx.closePath();
    switch (selectedShape) {
        case "circle":
            ctx.moveTo(e.clientX, e.clientY);
            // ctx.closePath();
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY,60,0,2 * Math.PI);
            ctx.stroke();
            break;
        case "square":
            ctx.strokeRect(e.clientX, e.clientY, 100, 60);
            break;
        case "line":
            startPointX = e.clientX;
            startPointY = e.clientY;
            console.log("we're in line case");
            drawLine(e, startPointX, startPointY);
            break;
        case "free-hand":
            isDrawing = true;
            ctx.beginPath();
            break;
        default:
            break;
    }
            //ctx.lineTo(e.clientX,e.clientY);
})
        
document.addEventListener("mouseup", e => {
     isDrawingLine = false;
     isDrawing = false;
     ctx.closePath();

    //ctx.closePath();
})
const drawLine = (e, startPointX, startPointY) => {

    // ctx.beginPath();
    if (startPointX && startPointY) {
        ctx.lineTo(startPointX, startPointY);
        ctx.moveTo(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
        startPointX = "";
        startPointY = "";
    }
    //ctx.closePath();

    console.log("we're in drawLine",e.clientX, e.clientY);
}

document.addEventListener("mousemove", e => {
    if (isDrawing) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
    
    // console.log("mouse is moving");
    // // drawLine(e);
    
})
// ctx.beginPath();
// ctx.lineTo(45, 560);
// ctx.lineTo(453, 123);
// ctx.stroke();