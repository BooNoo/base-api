import * as passportJWT from "passport-jwt";
import {Admin} from "../models/admin";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export class PassportConfig {

    public strategy(passport): void {
        let jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'tasmanianDevil'
        };

        let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
            let user = await Admin.findOne({_id: jwt_payload});
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
        passport.use(strategy);
    }
}
