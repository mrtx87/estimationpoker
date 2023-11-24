import express from "express";
import {UserService} from "./services/user-service";

import {logger} from "./services/s9logger";
import {initAppSettings} from "./init-server-util";
import {abortStartupOnCriticalError, hasRequiredAppConfig, printAppInitResult} from "./util/util";
import {InitAppProcess} from "./model/init-app-process";
import {
    connectToDB,
    registerTestDocuments,
    updateSuperUserCredentials
} from "./db/mongodb/mongodb-connection";// @ts-ignore
import WebSocket from "ws";
import {S9DocumentEditorService} from "./services/s9-document-editor-service";
import {WebsocketService} from "./services/websocket-service";
import {WebsocketControllerImpl} from "./controller/websocket-controller-impl";
import {EstimationPokerRoomRepository} from "./repository/estimation-poker-room-repository";
import {AppService} from "./services/app-service";
require('dotenv').config();

export const estimationPokerRoomRepository = EstimationPokerRoomRepository.estimationPokerRoomRepository;
//export const s9DocumentRevisionRepository = DocumentRevisionRepository.documentRevisionRepository;
//export const s9TagRepository = S9TagRepository.s9TagRepository;
export const s9DocumentEditorsService = S9DocumentEditorService.s9DocumentEditorService;
export const appService = AppService.appService;
export const userService = UserService.userService;
export const websocketService = WebsocketService.websocketService;
export const websocketServer = new WebSocket.Server({noServer: true, path: "/estimationpoker_websocket",});
export const websocketController = new WebsocketControllerImpl();


/* create express server */
export const app = express();

export function startEstimationPokerServer() {
    startupGreeting();
    hasRequiredAppConfig(
        new InitAppProcess([
            'requiredConfig',
            'initAppSettings',
            'connectToDB',
            'registerSuperUser',
            'initWebsocketSettings'
        ]))
        .then(init => initAppSettings(init, app), abortStartupOnCriticalError)
        .then((init: InitAppProcess) => initWebsocketSettings(init, websocketServer, websocketController, appService), abortStartupOnCriticalError)
        .then(connectToDB, abortStartupOnCriticalError)
        //.then(cleanupService.initImageCleanup.bind(cleanupService), abortStartupOnCriticalError)
        .then(registerExitHandlers, abortStartupOnCriticalError)
        .then(updateSuperUserCredentials, abortStartupOnCriticalError)
        //.then(addTestUsers, abortStartupOnCriticalError)
        .then(registerTestDocuments, abortStartupOnCriticalError)
        .then(printAppInitResult)
        .then(init => startWebServer(Number(process.env.PORT)));
}


function startWebServer(port: number) {
    // start the Express server
    const webServer = app.listen(port, () => {
        logger.log(`[APP SETUP] server started at ${port}`);
    });

}

/* app exit handling */
function exitHandler(event: any) {

}

function registerExitHandlers(init: InitAppProcess) {
    process.stdin.resume();
    process.on('SIGINT', exitHandler);
    process.on('SIGTERM', exitHandler);
    process.on('SIGUSR1', exitHandler);
    process.on('SIGUSR2', exitHandler);
    init.steps.registerExitHandlers = 1;
    return Promise.resolve(init)
}

function startupGreeting() {
    logger.info('[AppStartUp]: EstimationPoker App Initialization Starts.');
}



export function initWebsocketSettings(init: InitAppProcess, websocketServer: any, websocketController: WebsocketControllerImpl, appService: AppService) {
    //Websocket Server Config
    try {
        websocketServer.on('connection', (userConnection: any) => {
            try {
                logger.log('ws established - connections: {}', websocketServer.clients.size)

                userConnection.on('message', (data: any) => {
                    try {
                        const request = JSON.parse(data);
                        websocketController.onPlayerMessageIncoming(request, userConnection);
                    } catch (e) {
                        logger.error(e);
                    }
                });

                userConnection.on('close', () => {
                    try {
                        if ('roomId' in userConnection && 'userId' in userConnection) {
                            appService.processDisconnectClient(userConnection.roomId, userConnection.userId);
                        }
                    } catch (e) {
                        logger.error(e);
                    }
                });
            } catch (e) {
                logger.error(e);
            }
        });

        websocketServer.on('error', (error: any) => {
            logger.error(error)
        });

        init.steps.initWebsocketSettings = 1;
        return Promise.resolve(init);
    }catch (e) {
        init.steps.initWebsocketSettings = 0;
        return Promise.reject(init);
    }
}



