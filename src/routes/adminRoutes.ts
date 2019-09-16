import {AdminController} from "../controllers/adminController";

const permission = require('../_middleware/permission');

export class AdminRoutes {

    public adminController: AdminController = new AdminController();

    public routes(app, passport): void {
        app.route('/admin/sign-in')
            .post(this.adminController.create);
        app.route('/admin/auth')
            .post(this.adminController.auth);

    }
}
