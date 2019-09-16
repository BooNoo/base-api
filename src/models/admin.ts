import {Document, Schema} from "mongoose";
import {_genericModel} from './_genericModel'

const schema = {
    _id: {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
};

export interface IAdmin {
    _id: string;
    email: string;
    password: string;
    role: string;
}

export interface IAdminModel extends IAdmin, Document {
}

export const Admin = new _genericModel<IAdmin, IAdminModel>('admin', schema).init();
