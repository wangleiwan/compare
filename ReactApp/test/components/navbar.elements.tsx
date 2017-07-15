import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {NavbarLeftButton, NavbarTitle } from '../../components/navbar.elements';

@suite("<NavbarLeftButton />")
class NavbarLeftButtonTest {

    @test("should render Icon")
    render_icon() {
      const icon: string = 'ios-alert';
      let isPressed: boolean = false;
      const onPress: () => {} = () => isPressed = true; 
      const wrapper = shallow(<NavbarLeftButton icon={icon} onPress={onPress} />);
      
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('Icon')).to.have.length(1);
      expect(wrapper.find('Image')).to.not.exist;
      
      wrapper.find('TouchableOpacity').simulate('press');
      expect(isPressed).to.be.true;
    }

    @test("should render Image")
    render_image() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      let isPressed: boolean = false;
      const onPress: () => {} = () => isPressed = true; 
      const wrapper = shallow(<NavbarLeftButton image={photoUrl} onPress={onPress} />);
      
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Icon')).to.not.exist;

      wrapper.find('TouchableOpacity').simulate('press');
      expect(isPressed).to.be.true;
    }

    @test("should render nothing")
    render_nothing() {
      let isPressed: boolean = false;
      const onPress: () => {} = () => isPressed = true; 
      const wrapper = shallow(<NavbarLeftButton onPress={onPress} />);
      
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('Icon')).to.not.exist;
      expect(wrapper.find('Image')).to.not.exist;
      
      wrapper.find('TouchableOpacity').simulate('press');
      expect(isPressed).to.be.true;
    }
}


@suite("<NavbarTitle />")
class NavbarTitleTest {
  @test("should render default text")
  render_default() {
    const wrapper = shallow(<NavbarTitle />);
    expect(wrapper.find('MiText')).to.have.length(1);
    expect(wrapper.find('MiText').props().children).to.be.equal('SMB');
  }

  @test("should render custom text")
  render_custom() {
    const title: string = 'My Text';
    const wrapper = shallow(<NavbarTitle title={title} />);
    expect(wrapper.find('MiText')).to.have.length(1);
    expect(wrapper.find('MiText').props().children).to.be.equal(title);
  }
}
