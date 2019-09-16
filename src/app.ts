import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as mongoose from "mongoose";
import {Routes} from "./routes/_index";
import {PassportConfig} from "./config/passport";
import {Config} from "./config/config";

class App {

    public app: express.Application;
    public router: Routes;
    public passportConfig: PassportConfig;
    private config: Config;

    constructor() {
        this.app = express();
        this.passportConfig = new PassportConfig();
        this.config = new Config();
        this.configurator();
        this.mongoSetup();
        this.router = new Routes(this.app, passport);
    }

    private configurator(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.passportConfig.strategy(passport);
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', []);
            next();
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.config.parameter.mongoUrl, { useCreateIndex: true, useNewUrlParser: true });
    }

}

export default new App().app;
