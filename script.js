const canvas = document.getElementById("canvas");
const dif = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const circleButton = document.getElementById("circle");
const squareButton = document.getElementById("square");
const lineButton = document.getElementById("line");

const shapeButtons = document.querySelectorAll(".shape-button");

let selectedShape;
let isDrawingLine = false;

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
            ctx.arc(e.clientX, e.clientY,60,0,2 * Math.PI);
            ctx.stroke();
            break;
        case "square":
            ctx.strokeRect(e.clientX, e.clientY, 100, 60);
            break;
        case "line":
            console.log("we're in line case");
            drawLine(e);
            break;
        case "free-hand":
            ctx.strokeRect(e.clientX-dif.x, e.clientY-dif.y, 100, 60);
            ctx.stroke();
            break;
        default:
            break;
        }
            //ctx.lineTo(e.clientX,e.clientY);
})
        
document.addEventListener("mouseup", e => {
    //ctx.closePath();
})
const drawLine = (e) => {
    //ctx.closePath();
    ctx.beginPath();
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    console.log("we're in drawLine",e.clientX, e.clientY);
}

document.addEventListener("mousemove", e => {
    console.log("mouse is moving");
    drawLine(e);
    
})
ctx.beginPath();
ctx.lineTo(45, 560);
ctx.lineTo(453, 123);
ctx.stroke();