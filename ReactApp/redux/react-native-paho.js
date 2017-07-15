//sourced from:  https://github.com/pmorjan/paho-node
// global.WebSocket = require('ws');

global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    },
}
global.window = global;

// require('paho-mqtt/mqttws31.js');
require('paho-mqtt');

module.exports = global.Paho;
