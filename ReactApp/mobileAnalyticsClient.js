//aws mobile analytics
import { Platform } from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import AMA from './aws-mobile-analytics/ama';

AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId:'us-east-1:70b4f103-cccd-411d-a958-4a179921ead7'
});

if(Platform.OS !== 'ios') {
  AWS.MobileAnalytics.prototype.customizeRequests((req) => {
    req.on('build', () => {
      if (req.httpRequest.body) {
          req.httpRequest.headers['Content-Type'] = 'application/json';
      }        
    });
  });
}

const options = {
    appId : 'c3bbee81fc7c49798895155404e7b750',
    appTitle : 'UC SMB',
    platform : Platform.OS === 'ios' ? 'iPhoneOS' : 'Android',
    // logger: console
};

const mobileAnalyticsClient = new AMA.Manager(options);

export default mobileAnalyticsClient;