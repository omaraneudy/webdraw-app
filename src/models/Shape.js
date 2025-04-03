class Shape {
    constructor(x, y, width, height) {
        if (this.constructor === Shape) {
            throw new Error("You cannot instantiate an abstract class");
        }
        this.id = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    changeWidth() {

    }

    chamgePosition() {
        
    }

    // updateShape() {
    //     throw new Error("The abstract method 'updateShape' must be implemented in the subclass");
    // }

    

}

export default Shape;