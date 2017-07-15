import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Badge from '../../components/badge';

@suite("<Badge />")
class BadgeTest {
    @test("should render view")
    render_view() {
      const content = "hello";
      const wrapper = shallow(<Badge content={content} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Text')).to.have.length(1);
    }
}