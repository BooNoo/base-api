import * as mongoose from 'mongoose';
import {Schema, Model, model} from "mongoose";
import * as autoIncrement from 'mongoose-auto-increment'
import {Config} from "../config/config";

export class _genericModel<T, U> {

    private config = new Config();
    private connection = mongoose.createConnection(this.config.parameter.mongoUrl, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
    public schema: Schema;

    constructor(public name: string,
                schema: object) {
        autoIncrement.initialize(this.connection);
        this.schema = new Schema(schema, {timestamps: {}});
        this.schema.plugin(autoIncrement.plugin, name);
    }

    public init(): Model<U> {
        return model<U>(this.name, this.schema)
    }
}
