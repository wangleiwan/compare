'use strict';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
require('./react-native-paho');

import { Authentication } from '@mitel/cloudlink-authentication/authentication';
import { HttpService } from '@mitel/cloudlink-authentication/http-service';
import { Options } from '@mitel/cloudlink-authentication/options';
import * as Conversations from '@mitel/cloudlink-conversations';
import * as Notify from '@mitel/cloudlink-notifications';

const options = new Options(AsyncStorage);
export const authentication = new Authentication(options);

const CONVERSATIONS_URL = 'https://5daqxr4b0j.execute-api.us-east-1.amazonaws.com/prod/api/2016-12-31/conversations';
const NOTIFY_URL = 'https://z3ufmt6bpc.execute-api.us-east-1.amazonaws.com/prod/api/2016-12-31/notifications';

const deviceId = DeviceInfo.getUniqueID();
console.log(`Creating notify instance with ID:[${deviceId}]`);

const http = new HttpService(options.getHttp(), authentication);
export const notify = Notify.create({
    http: http,
    notifyUrl: NOTIFY_URL,
    websocket: {
        deviceId: deviceId,
        pahoMqtt: (websocketUrl, clientId) => new Paho.MQTT.Client(websocketUrl, clientId)
    }
});

console.log('Creating conversation instance');
export const conversations = Conversations.create({
    http: http,
    conversationsUrl: CONVERSATIONS_URL,
    notify: notify
});

console.info('Subscribing to diagnostics....');
notify.asDiagnosticsObservable()
    .subscribe(diag => console.log("Diag:  ", diag));
