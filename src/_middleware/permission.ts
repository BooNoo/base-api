import {Request, Response, NextFunction} from 'express';

export function role(allowed: [string]) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    return (req: Request, res: Response, next: NextFunction) => {
        if (req['user'] && isAllowed(req['user'].role))
            next();
        else {
            res.status(403).json({message: "No role access"});
        }
    }
}

export const all = ['user', 'admin'];
export const user = ['user'];
export const admin = ['admin'];

