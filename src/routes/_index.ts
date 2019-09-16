import {AdminRoutes} from "./adminRoutes";
import {GenericRoutes} from "./_genericRoutes";


let fs = require("fs");

export class Routes {

    public adminRoutes: AdminRoutes = new AdminRoutes();

    constructor(app: any, passport: any) {
        this.genericSetup(app, passport);
        this.routes(app, passport);
    }

    private genericSetup(app: any, passport: any) {
        fs.readdirSync(__dirname + '/../models')
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && !file.includes("_genericModel") && !file.includes("map");
            })
            .forEach(file => {
                let model = require('../models/' + file);
                let name = file.slice(0, -3);
                let modelName = name[0].toUpperCase() + name.slice(1);
                new GenericRoutes(model[modelName], name, app, passport);
            });
    }

    private routes(app: any, passport: any): void {
        this.adminRoutes.routes(app, passport);
    }

}
