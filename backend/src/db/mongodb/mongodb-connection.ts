import {InitAppProcess} from "../../model/init-app-process";
import {logger} from "../../services/s9logger";
import mongoose from "mongoose";
import {getTestRoom} from "../../util/util";
import {EstimationPokerRoomModel} from "./db-schemas";

export function connectToDB(init: InitAppProcess) {
    try {
        return new Promise((resolve, reject) => {
            const MONGO_DB_URL = `${process.env.DB_CONFIG_URL}${process.env.DB_CONFIG_DB_NAME}`;
            // mongo db stuff
            logger.log(`[MONGO DB] trying to establish connection to ${MONGO_DB_URL}`)

            // CONNECTION EVENTS
            // When successfully connected
            mongoose.connection.on('connected', function () {
                logger.log(`[MONGO DB] Mongoose default connection success: ${MONGO_DB_URL}`);
            });

            // If the connection throws an error
            mongoose.connection.on('error', function (err) {
                logger.error('Mongoose default connection error: ' + err);
            });

            // When the connection is disconnected
            mongoose.connection.on('disconnected', function () {
                logger.warn('Mongoose default connection disconnected');
            });

            mongoose.connect(MONGO_DB_URL).then(mongoose => {
                init.steps.connectToDB = 1;
                resolve(init)
            }, error => {
                logger.error(`[MONGO DB] establishing Mongoose Connection [${MONGO_DB_URL}] failed: ${error}`)
                reject(init)
            });

        });
    } catch (e) {
        logger.internalError(e);
        init.steps.connectToDB = -1;
        return Promise.reject(init);
    }
}

/*
export function updateSuperUserCredentials(init: InitAppProcess) {
    try {
        const superUser = DBUser.from(JSON.parse(process.env.SUPER_USER));
        userService.registerUserFromConfig(superUser)
        init.steps.registerSuperUser = 1;
        return Promise.resolve(init);
    }catch (e) {
        init.steps.registerSuperUser = -1;
        return Promise.reject(init);
    }
}


export async function addTestUsers(init: InitAppProcess) {
    try {
        if (process.env.TEST_USERS) {
            const testUsers = JSON.parse(process.env.TEST_USERS);
            await userService.registerTestUsers(testUsers.users.map(DBUser.from));
            init.steps.registerTestUser = 1;
        }
        return Promise.resolve(init);
    }catch (e) {
        init.steps.registerTestUser = -1;
        return Promise.resolve(init);
    }
} */

export async function createTestRoom(init: InitAppProcess) {
    try {
        const testRoomsAmount = process.env.TEST_ROOMS;
        if (testRoomsAmount && Number(testRoomsAmount) > 0) {
            logger.log(`[TEST ROOM CREATING] amount: ${Number(testRoomsAmount)}`)
            for(let i = 0; i < Number(testRoomsAmount); i++) {
                    const testRoomModel = new EstimationPokerRoomModel(getTestRoom());
                    await testRoomModel.save();
                    logger.log(`[TEST DOC CREATED] ${i} created ${testRoomModel.id}`);
                }
        }
        init.steps.registerTestRoom = 1;
        return Promise.resolve(init);
    }catch (e) {
        init.steps.testDocuments = -1;
        return Promise.resolve(init);
    }
}