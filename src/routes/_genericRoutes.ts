import {GenericController} from "../controllers/_genericController";
const permission = require('../_middleware/permission');

export class GenericRoutes {

    public genericController: GenericController;

    constructor(model: any, modelName: string, app: any, passport: any) {
        this.genericController = new GenericController(model);

        let url = '/rest/'+ modelName;

        app.route(url)
            .get(passport.authenticate('jwt', {session: false}), permission.role(permission.admin), this.genericController.get)
            .post(passport.authenticate('jwt', {session: false}), permission.role(permission.admin), this.genericController.create);

        app.route(url + '/:id')
            .get(passport.authenticate('jwt', {session: false}), permission.role(permission.all),  this.genericController.getById)
            .put(passport.authenticate('jwt', {session: false}), permission.role(permission.admin), this.genericController.updateById)
            .delete(passport.authenticate('jwt', {session: false}), permission.role(permission.admin),  this.genericController.deleteById);

    }

}
