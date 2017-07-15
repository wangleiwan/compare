import { Platform } from 'react-native';
import LinearGradientIos from 'react-native-linear-gradient/index.ios.js';
import LinearGradientAndroid from 'react-native-linear-gradient/index.android.js';

const LinearGradient = Platform.OS === 'ios' ? LinearGradientIos : LinearGradientAndroid;

export default LinearGradient;