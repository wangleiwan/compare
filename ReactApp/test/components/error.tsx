import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Error from '../../components/error';

@suite("<Error />")
class ErrorTest {

    @test("should render default error message")
    render_view() {
      const wrapper = shallow(<Error />);
      const defaultText: string = 'Woops, Something wen\'t wrong.';
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').children()).to.have.length(1);
      expect(wrapper.find('MiTransText').children().get(0)).to.equal(defaultText);
    }

    @test("should render error message")
    render_image_1() {
      const text: string = 'Server is down';
      const wrapper = shallow(<Error text={text} />);
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').children()).to.have.length(1);
      expect(wrapper.find('MiTransText').children().get(0)).to.equal(text);
    }

}
