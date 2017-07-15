import React, { Animated } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Overlay from '../../components/Overlay';
import ReactNativeMock from 'react-native-mock';

require('react-native-mock/mock');

@suite("<Overlay />")
class OverlayTest {

    @test("should render component with default settings")
    render_component_1() {
      const wrapper = shallow(<Overlay />);
      expect(wrapper.find(Animated.View)).to.have.length(1);
    }

    @test("should render component with custom settings")
    render_component_2() {
      const opacity: number = 2;
      const wrapper = shallow(<Overlay opacity={opacity} />);
      expect(wrapper.find(Animated.View)).to.have.length(1);
    }

    @test("when platform.os = 'android'")
    render_android() {
      ReactNativeMock.Platform.OS = 'android';
      const wrapper = shallow(<Overlay />);
      expect(wrapper.find(Animated.View)).to.have.length(1);
    }

    @test("when platform.os = 'ios'")
    render_ios() {
      ReactNativeMock.Platform.OS = 'ios';
      const wrapper = shallow(<Overlay />);
      expect(wrapper.find(Animated.View)).to.have.length(1);
    }
    /*
    @test("test function componentDidMount")
    test_componentDidMount() {
      let overlay = new Overlay({});
      overlay.componentDidMount();
    }*/

    @test("test function closeModal")
    test_closeModal() {
      let overlay = new Overlay({});
      overlay.closeModal();
    }
}
