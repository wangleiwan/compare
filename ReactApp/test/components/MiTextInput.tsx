import React, { TextInput, Platform } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MiTextInput from '../../components/MiTextInput';
import AppConfig from '../../config';
import {Style} from '../../styles';

@suite("<MiTextInput />")
class MiTextInputTest {

    @test("should render TextInput with underlineColorAndroid to transparent on Android")
    render_textInput_android() {
      const wrapper = shallow(<MiTextInput />);
      expect(wrapper.find('TextInput')).to.have.length(1);
      if(Platform.OS === 'android') {
        expect(wrapper.find('TextInput').props()).to.have.deep.property('underlineColorAndroid', 'transparent');
      }
    }
}
