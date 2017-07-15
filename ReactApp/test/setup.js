require('react-native-mock/mock');

require("babel-register")({
    ignore: false
}); 

import { jsdom } from "jsdom";

const exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("");
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

global.__DEV__ = true;

// Setup mocks
import mockery from 'mockery';
//mockery.enable();
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});
mockery.registerMock('react-native-maps', {AssetRegistry: {}});
mockery.registerMock('../assets/images/welcome.png', 0);
mockery.registerMock('../assets/images/navbar/back@2x.png', 0);
mockery.registerMock('../assets/images/navbar/call@2x.png', 0);
mockery.registerMock('../assets/images/navbar/contact@2x.png', 0);
mockery.registerMock('../assets/images/navbar/contacts@2x.png', 0);
mockery.registerMock('../assets/images/navbar/contacts.png', 0);
mockery.registerMock('../assets/images/navbar/callhistory@2x.png', 0);
mockery.registerMock('../assets/images/navbar/callhistory.png', 0);
mockery.registerMock('../assets/images/navbar/search@2x.png', 0);
mockery.registerMock('../assets/images/navbar/search.png', 0);
mockery.registerMock('../assets/images/navbar/chat@2x.png', 0);
mockery.registerMock('../assets/images/navbar/chat.png', 0);
mockery.registerMock('../assets/images/navbar/more@2x.png', 0);
mockery.registerMock('../assets/images/navbar/call-light@2x.png', 0);
mockery.registerMock('../assets/images/navbar/chat-light@2x.png', 0);
mockery.registerMock('../assets/images/navbar/backspace@2x.png', 0);
mockery.registerMock('../assets/images/navbar/close@2x.png', 0);
mockery.registerMock('../assets/images/navbar/call white@2x.png', 0);
mockery.registerMock('../assets/images/navbar/close white@2x.png', 0);
mockery.registerMock('../assets/images/navbar/dialpad@2x.png', 0);
mockery.registerMock('../assets/images/navbar/ptt@2x.png', 0);
mockery.registerMock('../assets/images/navbar/add@2x.png', 0);
mockery.registerMock('../assets/images/navbar/home.png', 0);
mockery.registerMock('../assets/images/navbar/home@2x.png', 0);
mockery.registerMock('../assets/images/navbar/settings.png', 0);
mockery.registerMock('../assets/images/navbar/settings@2x.png', 0);
mockery.registerMock('../assets/images/navbar/edit.png', 0);
mockery.registerMock('../assets/images/navbar/edit@2x.png', 0);
mockery.registerMock('../assets/images/navbar/back white.png', 0);
mockery.registerMock('../assets/images/navbar/hamburger.png', 0);
mockery.registerMock('../assets/images/logo@2x.png', 0);
mockery.registerMock('../assets/images/group@2x.png', 0);
mockery.registerMock('../assets/images/loading.gif', 0);
mockery.registerMock('../assets/images/navbar/delete@2x.png', 0);
mockery.registerMock('react-native-linear-gradient/index.ios.js', 'LinearGradientIos');
mockery.registerMock('react-native-linear-gradient/index.android.js', 'LinearGradientAndroid');
mockery.registerMock('../assets/animations/loading.json', 'loading');
mockery.registerMock('../assets/animations/check.json', 'check');
mockery.registerMock('../assets/images/checkmark@2x.png', 0);
mockery.registerMock('../assets/images/video_small_medium@2x.png', 0);
mockery.registerMock('../assets/images/info@2x.png', 0);
mockery.registerMock('../assets/images/navbar/logout@2x.png', 0);
mockery.registerMock('../assets/images/add_home_tile@2x.png', 0);
mockery.registerMock('../assets/images/add_home_tile_empty@2x.png', 0);

require.extensions['.ios.js'] = require.extensions['.js'];
chai.use(chaiEnzyme());
