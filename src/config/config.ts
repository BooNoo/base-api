class ConfigParam {

    public mongoUrl: string;

    constructor(environment: string) {
        this.mongoUrl = 'mongodb://localhost:27017/CMApp-ts';

        if (environment == 'development') {
            this.mongoUrl = 'mongodb://localhost:27017/CMApp-ts'
        }
    }
}

export class Config {

    private environment: string = process.env.NODE_ENV || 'development';
    public parameter: ConfigParam;

    constructor(){
        this.parameter = new ConfigParam(this.environment)
    }
}

