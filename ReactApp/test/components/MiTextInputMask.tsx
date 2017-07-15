import React, { TextInput, Platform } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MiTextInputMask from '../../components/MiTextInputMask';
import AppConfig from '../../config';
import {Style} from '../../styles';

@suite("<MiTextInput />")
class MiTextInputTest {

    @test("should render TextInput with underlineColorAndroid to transparent on Android")
    render_textInput_android() {
      const wrapper = shallow(<MiTextInputMask />);
      expect(wrapper.find('TextInputMask')).to.have.length(1);
      if(Platform.OS === 'android') {
        expect(wrapper.find('TextInputMask').props()).to.have.deep.property('underlineColorAndroid', 'transparent');
      }
    }
}
