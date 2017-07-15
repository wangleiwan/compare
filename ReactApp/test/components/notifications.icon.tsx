import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Notification from '../../components/notifications.icon';

@suite("<Notification />")
class NotificationTest {

    @test("should render component with default settings")
    render_component_1() {
      const wrapper = shallow(<Notification />);
      expect(wrapper.find('View')).to.have.length(1);
    }

    @test("should render component with custom settings")
    render_component_2() {
      const color: string = 'yellow';
      const wrapper = shallow(<Notification color={color} />);
      expect(wrapper.find('View')).to.have.length(1);
    }
}
