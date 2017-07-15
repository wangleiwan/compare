import React, { Image, TextInput, Platform } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MessageText from '../../components/messenger-text';

@suite("<MessageText />")
class MessageTextTest {

    @test("should render view when position = left")
    render_view_1() {
      const position: string = 'left';
      const currentMessage: object = {
        text: 'hello'
      };
      const wrapper = shallow(<MessageText position={position} currentMessage={currentMessage} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('ParsedText')).to.have.length(1);
    }

    @test("should render view when position = right")
    render_view_2() {
      const position: string = 'right';
      const currentMessage: object = {
        text: 'hello'
      };
      const wrapper = shallow(<MessageText position={position} currentMessage={currentMessage} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('ParsedText')).to.have.length(1);
    }
   
    @test("simulate ParsedText onPress event")
    render_view_3() {
      const position: string = 'right';
      const currentMessage: object = {
        text: 'hello'
      };
      const wrapper = shallow(<MessageText position={position} currentMessage={currentMessage} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find(ParsedText)).to.have.length(1);

      wrapper.find(ParsedText).simulate('press');
    }

    @test("test function onUrlPress")
    test_onUrlPress() {
      let messageText = new MessageText({});
      const url = "www.mitel-api.com";
      messageText.onUrlPress(url);
    }

    @test("test function onPhonePress")
    test_onPhonePress() {
      let messageText = new MessageText({});
      const phone = "123-456-7890";
      messageText.onPhonePress(phone);
    }

    @test("test function onEmailPress")
    test_onEmailPress() {
      let messageText = new MessageText({});
      const email = "abc@example.com";
      messageText.onEmailPress(email);
    }
    
}
