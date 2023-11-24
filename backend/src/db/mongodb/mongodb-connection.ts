import {InitAppProcess} from "../../model/init-app-process";
import {logger} from "../../services/s9logger";
import mongoose from "mongoose";
import {userService} from "../../server";
import {DBUser} from "../../model/user";
import {randomDoc} from "../../util/util";
import {S9DocumentModel} from "./db-schemas";

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

export function updateSuperUserCredentials(init: InitAppProcess) {
    try {
        const superUser = DBUser.of(JSON.parse(process.env.SUPER_USER));
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
            await userService.registerTestUsers(testUsers.users.map(DBUser.of));
            init.steps.registerTestUser = 1;
        }
        return Promise.resolve(init);
    }catch (e) {
        init.steps.registerTestUser = -1;
        return Promise.resolve(init);
    }
}

export async function registerTestDocuments(init: InitAppProcess) {
    try {
        const testUsersRaw = process.env.TEST_DOCUMENTS;
        if (testUsersRaw && Number(testUsersRaw) > 0) {
            logger.log(`[TEST DOCUMENTS CREATING] amount: ${Number(testUsersRaw)}`)
            for(let i = 0; i < Number(testUsersRaw); i++) {
                    const testDoc = new S9DocumentModel(randomDoc());
                    await testDoc.save();
                    logger.log(`[TEST DOC CREATED] ${i} created ${testDoc.id}`);
                }
        }
        return Promise.resolve(init);
    }catch (e) {
        init.steps.testDocuments = -1;
        return Promise.resolve(init);
    }
}