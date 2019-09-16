import {Request, Response} from "express";
const {createLogger, format} = require('winston');
const winston = require('winston');
require('winston-daily-rotate-file');
let LineByLineReader = require('line-by-line');
const {combine, timestamp, printf} = format;

const logLevel = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

export const generic = createLogger({
    format: combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/generic/info/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/generic/error/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
    ]
});

export const user = createLogger({
    format: combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/user/info/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/user/error/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
    ]
});

export const company = createLogger({
    format: combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/company/info/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/company/error/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
    ]
});

export class LoggerController {
    public availableLogs = async (req: Request, res: Response) => {
        res.json({
            generic: "generic",
            user: "user",
        })
    };

    public get = async (req: Request, res: Response) => {
        let lr = new LineByLineReader('././logs/' + req.query.log + '/'+ req.query.level +'/'+ req.params.date +'.log');
        let obj = [];

        lr.on('error', function (err) {
            res.json({error: true, message: err})
        });

        lr.on('line', function (line) {
            try {
                let json = JSON.parse(line);
                obj.push(json)
            } catch (error) {

            }
        });

        lr.on('end', function () {
            if (req.query.length) {
                res.json(obj.length)
            } else {
                res.json(obj)
            }
        });
    };
}
