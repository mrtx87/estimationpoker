import express from "express";
import {applyAppRestControllerConfig} from "./controller/app-rest-controller-impl";
import helmet = require('helmet');
import {Express} from "express";
import {InitAppProcess} from "./model/init-app-process";
import {APP_REST_PREFIX, cors, ErrorResponse} from "./controller-config/rest-controller-configurator";
import {userService} from "./server";
import {logger} from "./services/s9logger";

export function initAppSettings(init: InitAppProcess, app: Express) {

    try {
        app.use(cors({credentials: true}));
        // helmet config
        app.use(helmet());
        app.use(
            helmet.dnsPrefetchControl({
                allow: true,
            })
        );

        app.use(
            helmet.frameguard({
                action: "deny",
            })
        );
        app.use(helmet.hidePoweredBy());
        app.use(helmet.noSniff());
        app.use(
            helmet.referrerPolicy({
                policy: ["origin", "unsafe-url"],
            })
        );
        app.use(helmet.xssFilter());

// json and endpoint parsing options

        app.use(express.json({limit: '10mb'}));
        app.use(express.urlencoded({limit: '15mb', extended: true}));
        app.use(authMiddleWare)
        app.all('*', function (req, res, next) {
            const Origin = req.get('Origin');
            res.header('Access-Control-Allow-Origin', Origin);
            res.header('Access-Control-Allow-Credentials', "true");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        applyAppRestControllerConfig(app);
        init.steps.initAppSettings = 1;
        return Promise.resolve(init);
    } catch (e) {
        logger.internalError(e);
        init.steps.initAppSettings = -1;
        return Promise.reject(init);
    }
}

const UNPROTECTED_ROUTES = [
    APP_REST_PREFIX +'/create-room',
    APP_REST_PREFIX +'/join-room',
];

export const authMiddleWare = function (req: any, res: any, next: any) {

    const url = req?.url;
    if(isUnprotectedRoute(url)) {
        return next();
    }

    const auth = userService.authenticate(req);
    if (auth instanceof ErrorResponse) {
        return res.status(auth.code).send(auth.message);
    }
    return next();
};

function isUnprotectedRoute(url: string) {
    return UNPROTECTED_ROUTES.find(route => url.includes(route));
}




