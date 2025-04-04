import Rectangle from "../models/Rectangle.js";
import HomeModel from "../models/HomeModel.js";
import HomeView from "../views/HomeView.js";

class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
        this.view.detectShapeButton()
        this.view.mouseDown();
        this.view.mouseMove();
        this.view.mouseUp();

    }
}

export default HomeController;

