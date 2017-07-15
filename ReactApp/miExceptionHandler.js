
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

import { authentication } from './redux/cloudlink';

const LOGS_URL = 'https://lu2b83dhda.execute-api.us-east-1.amazonaws.com/sandbox/api/2016-12-31/logs';

const sendExceptionReport = (e) => {
    let crashData = {};
    crashData.name = e.name;
    crashData.message = e.message;
    crashData.details = e;
    crashData.stack = e.stack.split('\n');

    authentication.getToken()
        .then(token => {
            if (token.accessToken) {
                return fetch(LOGS_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token.accessToken
                    },
                    body: JSON.stringify(crashData)
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        return responseJson;
                    }).catch((error) => {
                        console.error(error);
                    });

            } else {
                console.error('Unable to get a valid token to send the crash report.');
                console.error(JSON.stringify(crashData));
            }
        }).catch(error => {
            console.error(error);
        });


};

const errorHandler = (e, isFatal) => {
    sendExceptionReport(e);

    if (isFatal) {
        Alert.alert(
            'Unexpected error occurred',
            `${(isFatal) ? 'Fatal: ' : ''}${e.name} ${e.message}. The application requires a restart.`,
            [{
                text: 'OK',
                onPress: () => {
                    RNRestart.Restart();
                }
            }]
        );
    }

};

export const setMiExceptionHandler = (allowedInDevMode = false, customHandler = errorHandler) => {
    const allowed = allowedInDevMode ? true : !__DEV__;
    if (allowed) {
        global.ErrorUtils.setGlobalHandler(customHandler);
    } else {
        console.log('Application is running in DEV mode and allowedInDevMode is false, skipping setMiExceptionHandler');
    }
};

export default {
    setMiExceptionHandler
};