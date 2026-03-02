class HomeModel {
  constructor() {
    this.shapes = JSON.parse(localStorage.getItem("shapes")) || [];
  }

  guardarpruebamodel(variable) {
    console.log("imprimiendo " + variable + " con metodo desde modelo");
  }

  addShape(shape) {
    // console.log("entro addshape");
    if (shape === null) return;
    this.shapes.push(shape);
    // console.log("añadio addshape");
    this.save();
  }

  removeShape(index) {
    this.shapes.splice(index, 1);
    this.save();
  }

  getShapes() {
    return this.shapes;
  }

  updateShape(newShape, actualLayer = undefined, newLayer = undefined) {

    if (newLayer >= 0) {
      this.shapes[actualLayer] = this.shapes[newLayer];
      this.shapes[newLayer] = newShape;
      this.save();
      return;
    }

    this.shapes.forEach(rectangle => {
      if (rectangle.id === newShape.id) {
        rectangle = newShape;
        this.save();
        return;
      }
    });
  }

  save() {
    localStorage.setItem("shapes", JSON.stringify(this.shapes));
  }



}

export default HomeModel;