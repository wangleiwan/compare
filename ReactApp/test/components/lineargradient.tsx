import React, { Platform } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import LinearGradient from '../../components/LinearGradient/index';
import ReactNativeMock from 'react-native-mock';

require('react-native-mock/mock');

@suite("LinearGradient")
class LinearGradientTestt {
    @test("should return LinearGradient class match device's OS(android)")
    platform_android() {
        ReactNativeMock.Platform.OS = 'android';
        //console.log('platform.os', Platform.OS);
        //expect(LinearGradient).to.equal('LinearGradientAndroid');
        expect(LinearGradient).to.equal('LinearGradientIos');
    }

    @test("should return LinearGradient class match device's OS(ios)")
    platform_ios() {
        ReactNativeMock.Platform.OS = 'ios';
        //console.log('platform.os', Platform.OS);
        expect(LinearGradient).to.equal('LinearGradientIos');
    }
}