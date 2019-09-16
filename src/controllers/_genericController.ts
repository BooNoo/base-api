import {Request, Response} from "express";
const logger = require('../controllers/loggerController').generic;

export class GenericController {

    constructor(public model: any) {
    }

    public create = async (req: Request, res: Response) => {
        try {
            let data = new this.model(req.body);
            await data.save();
            logger.info({mode: 'Create', message: 'Model: ' + this.model['modelName'], data: req.body});
            res.json(data);
        } catch (e) {
            logger.info({mode: 'Error Create', message: 'Model: ' + this.model['modelName'], data: req.body, error: e});
            res.status(500);
            res.send(e);
        }
    };

    public get = async (req: Request, res: Response) => {
        try {
            let data = await this.model.find();
            res.json(data);
        } catch (err) {
            res.status(500);
            console.log(err);
            res.json(err);
        }
    };

    public getById = async (req: Request, res: Response) => {
        try {
            let data = await this.model.findOne({_id: req.params.id});
            if (data != null) {
                res.json(data);
            } else {
                res.status(404);
                res.send('No found');
            }
        } catch (err) {
            res.status(500);
            res.send(err);
        }
    };

    public updateById = async (req: Request, res: Response) => {
        try {
            await this.model.findOneAndUpdate({_id: req.params.id}, req.body);
            let data = await this.model.findById(req.params.id);
            logger.info({mode: 'Update', message: 'Model: ' + this.model['modelName'], _id: req.params.id, data: req.body});
            res.json(data);
        } catch (err) {
            logger.info({mode: 'Error Update', message: 'Model: ' + this.model['modelName'], _id: req.params.id, data: req.body});
            res.status(500);
            res.send(err);
        }
    };

    public deleteById = async (req: Request, res: Response) => {
        try {
            await this.model.deleteOne({_id: req.params.id});
            logger.info({mode: 'Delete', message: 'Model: ' + this.model['modelName'], _id: req.params.id});
            res.json({error: false});
        } catch (err) {
            logger.info({mode: 'Error Delete', message: 'Model: ' + this.model['modelName'], _id: req.params.id});
            res.status(500);
            res.send(err);
        }
    }
}
