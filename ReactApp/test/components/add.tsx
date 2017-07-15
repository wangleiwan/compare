import React, { Image, TextInput } from 'react-native';
import { render, mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Add from '../../components/add';

interface props {
    onPress?: () => any,
    style?: any,
    addFirst?: boolean
}

interface state {

}


@suite("<Add />")
class AddTest {

    @test("should render stuff")
    render_view() {
      const wrapper = shallow(<Add />);
      expect(wrapper.find('View')).to.have.length(1);
    }

    @test("should render the add icon image")
    render_image() {
      const wrapper = shallow(<Add />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render anchor link")
    render_anchor() {
      const wrapper = shallow(<Add />);
      expect(wrapper.find('A')).to.have.length(1);
    }

    @test("should set height and width style properties")
    render_size() {
      const size:number = 50;
      const wrapper = shallow(
        <Add style={{ width: size, height: size}}/>
      );
      const children = wrapper.find('A').children();
      expect(children.get(0).props.style).to.have.deep.property('[1].width', size);
    }

    @test("simulates anchor link click event without onPress property")
    click_anchor_without_onPress() {
      let contactModal: boolean = false;
      const wrapper = shallow(
        <Add />
      );

      wrapper.find('A').simulate('press');
      expect(contactModal).to.be.false;
    }

    @test("simulates anchor link click event with empty onPress function")
    click_anchor_empty_onPress() {
      const onPress: () => {} = null;
      let contactModal: boolean = false;
      const wrapper = shallow(
        <Add onPress={onPress} />
      );

      wrapper.find('A').simulate('press');
      expect(contactModal).to.be.false;
    }

    @test("simulates anchor link click event with onPress function")
    click_anchor_with_onPress() {
      let contactModal: boolean = false;
      const onPress: () => {} = () => contactModal = !contactModal;

      const wrapper = shallow(
        <Add onPress={onPress} />
      );

      wrapper.find('A').simulate('press');
      expect(contactModal).to.be.true;
    }

    @test("test constructor")
    test_constructor() {
      let addObj = new Add(null);
    }
}
