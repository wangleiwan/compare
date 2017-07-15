import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import A from '../../components/anchor';

@suite("<A />")
class AnchorTest {
  @test("should render stuff")
  render_component() {
    const wrapper = shallow(<A />);
    expect(wrapper.find('TouchableHighlight')).to.have.length(1);
  }
}
