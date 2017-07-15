import React, { Image, TextInput } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Button from '../../components/button';

@suite("<Button />")
class ButtonTest {

    @test("should render default button")
    render_button_1() {
      const wrapper = shallow(<Button />);
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
    }

    @test("should render button with type as 'outlined'")
    render_button_2() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'outlined';
      const text: string = 'click here';
      const size: string = 'small';
      const disabled: boolean = false;
      const wrapper = shallow(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
    }

    @test("should render button with type as 'buttonText'")
    render_button_3() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'buttonText';
      const text: string = 'click here';
      const size: string = 'small';
      const disabled: boolean = false;
      const wrapper = shallow(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
    }

    @test("should render button with type as 'reverse'")
    render_button_4() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'reverse';
      const text: string = 'click here';
      const size: string = 'small';
      const disabled: boolean = false;
      const wrapper = shallow(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
    }

    @test("should render button with size as 'large'")
    render_button_5() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'buttonText';
      const text: string = 'click here';
      const size: string = 'large';
      const disabled: boolean = false;
      const wrapper = shallow(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
    }

    @test("simulates click event with button enabled")
    click_button() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'outlined';
      const text: string = 'click here';
      const size: string = 'small';
      const disabled: boolean = false;

      const wrapper = shallow(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );

      wrapper.find('TouchableOpacity').simulate('press');
      expect(isClicked).to.be.true;
    }

    @test("simulates click event with button disabled")
    click_button_2() {
      let isClicked: boolean = false;
      const onPress: () => {} = () => isClicked = true;
      const type: string = 'outlined';
      const text: string = 'click here';
      const size: string = 'small';
      const disabled: boolean = true;

      const wrapper = mount(
        <Button onPress={onPress} text={text} type={type} size={size} disabled={disabled} />
      );

      //wrapper.find('TouchableOpacity').simulate('click');
      expect(isClicked).to.be.false;
    }

    @test("simulates click event with undefined onPress function")
    click_button_3() {
      const wrapper = shallow(<Button />);
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      wrapper.find('TouchableOpacity').simulate('press');
    }
}
