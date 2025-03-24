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

console.log(dif.x + " x ");
console.log(dif.y + " y ");

let rectangleId = 0;
let newPointX = 0;
let newPointY = 0;

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
        console.log("desde foreach " + shapeButton.id + " forma seleccionada " + selectedShape);
        e.stopPropagation();

    })
})

let testSquare = false;
let testSquarePointX = null;
let testSquarePointY = null;

let testSelect = false;
let selectPointX = null;
let selectPointY = null;


let selectedRectangle = null;

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
            xRectSelect = e.offsetX;
            yRectSelect = e.offsetY;
            //testSelect = true;


            selectedRectangle = rectangles.find(rectangle =>
            (xRectSelect > rectangle.x && xRectSelect < rectangle.width + rectangle.x
                && yRectSelect > rectangle.y && yRectSelect < rectangle.y + rectangle.height));


            //click on rectangle's border
            // selectedRectangle = rectangles.find(rectangle =>
            //     (xRectSelect > rectangle.x && xRectSelect < rectangle.width + rectangle.x 
            //         && yRectSelect > rectangle.y - 5 && yRectSelect < rectangle.y + 5));


            console.log(selectedRectangle);
            if (!selectedRectangle) return;
            ctx3.beginPath();
            ctx3.strokeText(`x=${selectedRectangle.x}, y=${selectedRectangle.y}`, selectedRectangle.x, selectedRectangle.y);


            //punto1 =  ,  punto2 = x + width, punto3 = (y + height, x + width), punto4 = y + height 


            //Corner1 = (x,y)
            //Corner2 = x + width
            //Corner3 = (y + height, x + width)
            //Corner4 = y + height 


            //Corner1 = (x,y)
            //Corner2 = x + width
            //Corner3 = (y + height, x + width)
            //Corner4 = y + height 








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

    if (selectedShape === "square") {


        if (xRect && yRect && widthRect && heightRect) {
            if (rectangles.length == 0) {
                rectangleId = 0;
            }
            else {
                rectangleId += 1;
            }

            rectangles.push(
                {
                    id: rectangleId,
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


    }
    if (selectedRectangle && newPointX && newPointY) {
        selectedRectangle.x = newPointX;
        selectedRectangle.y = newPointY;
        rectangles.push(selectedRectangle);
        selectedRectangle = undefined;
        newPointX = undefined;
        newPointY = undefined;

        // ctx.clearRect(0, 0, 10000, 10000);
        // rectangles.forEach(rectangle => {
        //     // ctx.strokeStyle = "black";
        //     ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        // });
    }


})
const ctx2 = canvas.getContext("2d");
const ctx3 = canvas.getContext("2d");
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

        ctx2.clearRect(0, 0, 10000, 10000);
        // ctx2.clearRect(xRectSelect+1, yRectSelect+1, widthRectSelect+1, heightRectSelect+1);



        rectangles.forEach(rectangle => {
            // ctx.strokeStyle = "black";
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });

        ctx2.strokeText(`x=${e.offsetX}, y=${e.offsetY}`, e.offsetX, e.offsetY);



    }
    //xClick=350
    //x=260
    //xdifference = 90


    if (selectedRectangle) {

        newPointX = e.offsetX - (xRectSelect - selectedRectangle.x);
        newPointY = e.offsetY - (yRectSelect - selectedRectangle.y);



        //console.log(e.offsetX-(xRectSelect-selectedRectangle.x),e.offsetY-(yRectSelect-selectedRectangle.y));


        rectangles = rectangles.filter(rectangle => rectangle.id !== selectedRectangle.id);

        ctx.clearRect(0, 0, 10000, 10000);



        ctx.strokeRect(newPointX, newPointY, selectedRectangle.width, selectedRectangle.height);

        // rectangles.forEach(rectangle =>{
        //     if (rectangle.id === selectedRectangle.id) {
        //         selectedRectangle.x = newPointX;
        //         selectedRectangle.y = newPointY;
        //         return;
        //     }
        // })


        rectangles.forEach(rectangle => {
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });


    }


})