import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Status from '../../components/status';
import { Style } from '../../styles';

@suite("<Status />")
class StatusTest {

    @test("should render component with default settings")
    render_component_1() {
      const wrapper = shallow(<Status />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('View').props().style).to.have.deep.property('[0].width', Style.getHeight(6));
    }

    @test("should render component with custom settings")
    render_component_2() {
      const color: string = 'yellow';
      const size: number = 100;
      const wrapper = shallow(<Status color={color} size={size} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('View').props().style).to.have.deep.property('[0].width',size);
    }

    @test("should render component with default settings when there is no such color")
    render_component_3() {
      const color: string = 'red';
      const size: number = 100;
      const wrapper = shallow(<Status color={color} size={size} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('View').props().style[0].backgroundColor).to.not.be.undefined;
    }
}
