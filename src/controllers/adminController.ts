import {Admin} from '../models/admin';
import {Request, Response} from 'express';

const {compare, genSalt, hash} = require('bcrypt');
const jwt = require('jsonwebtoken');
// const logger = require('../controllers/loggerController').user;

export class AdminController {

    public create = async(req: Request, res: Response) => {
        try {
            let salt = await genSalt(8);
            req.body.password = await hash(req.body.password, salt);
            let admin = new Admin(req.body);
            await admin.save();
            // logger.info({mode: 'Create', message: '', data: req.body});
            res.json(admin);
        } catch (e) {
            // logger.info({mode: 'Error Create', message: '', data: req.body, error: e});
            res.status(500);
            res.send(e);
        }
    };

    public auth = async(req: Request, res: Response) => {
        try {
            let user = await Admin.findOne({phone: req.body.phone});
            const passwordMatch = await compare(req.body.password, user.password);
            if (passwordMatch) {
                let payload = user._id;
                let token = jwt.sign(payload, 'tasmanianDevil');
                // logger.info({mode: 'Auth', message: 'success', user: user, token: token});
                res.json({
                    token: token
                });
            } else {
                // logger.info({mode: 'Auth', message: 'passwords did not match', user: user});
                res.status(401).json({message: 'passwords did not match'});
            }
        } catch (err) {
            res.status(500);
            res.json(err);
        }
    };
    //
    // public self = async(req: Request, res: Response) => {
    //     res.json(req['user']);
    // }

}
