import HomeModel from "../models/HomeModel.js";
import HomeView from "../views/HomeView.js";

class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();


    }
}

export default HomeController;

