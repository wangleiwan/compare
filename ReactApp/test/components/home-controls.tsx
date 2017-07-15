import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import HomeControls from '../../components/home-controls';

@suite("<HomeControls />")
class HomeControlsTest {

    @test("should render component with default settings")
    render_view() {
      const wrapper = shallow(<HomeControls />);
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('MiText')).to.have.length(2);
    }

    @test("should render component with custom settings")
    render_image_1() {
      const color: string = 'yellow';
      const size: number = 100;
      const pushToTalk: any = 1;
      const wrapper = shallow(<HomeControls color={color} size={size} pushToTalk={pushToTalk} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Blue')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

}
