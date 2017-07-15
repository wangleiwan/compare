import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Blue from '../../components/blue';

@suite("<Blue />")
class BlueTest {
  @test("should render stuff")
  render_component() {
    const wrapper = shallow(<Blue />);
    expect(wrapper.find('View')).to.have.length(1);
  }
}
