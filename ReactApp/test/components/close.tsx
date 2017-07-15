import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Close from '../../components/close';
import { Style } from '../../styles';

@suite("<Close />")
class CloseTest {

    @test("should render component when size is defined")
    render_component_1() {
      const size: number = 100;
      const wrapper = shallow(<Close size={size} />);
      expect(wrapper.find('A')).to.have.length(1);
      const children = wrapper.find('A').children();
      expect(children.get(0).props.style).to.have.deep.property('[1].width', size);
    }

    @test("should render component when size is undefined")
    render_component_2() {
      const wrapper = shallow(<Close />);
      expect(wrapper.find('A')).to.have.length(1);
      const children = wrapper.find('A').children();
      expect(children.get(0).props.style).to.have.deep.property('[1].width', Style.getWidth(25));
    }

    @test("simulates click event when onPress is undefined")
    click_close_1() {
      let isClicked: boolean = false;
      const size: number = 100;

      const wrapper = shallow(
        <Close size={size} />
      );
      
      expect(wrapper.find('A')).to.have.length(1);
      wrapper.find('A').simulate('press');
      expect(isClicked).to.be.false;
    }

    @test("simulates click event when onPress is defined")
    click_close_2() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const size: number = 100;

      const wrapper = shallow(
        <Close onPress={onPress} size={size} />
      );
      
      expect(wrapper.find('A')).to.have.length(1);
      wrapper.find('A').simulate('press');
      expect(isClicked).to.be.true;
    }

}
