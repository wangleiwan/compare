import React, { View } from 'react-native';
import { expect } from 'chai';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import TelephoneInput from '../../components/mobile';
import MiTextInput from '../../components/MiTextInput';

@suite("<TelephoneInput />")
class TelephoneInputTest {

    @test("should render view with initial state")
    render_view_1() {
      const wrapper = shallow(<TelephoneInput />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }
/*
    @test("simulate MiTextInput change event ")
    render_view_2() {
      const wrapper = shallow(<TelephoneInput />);
      
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);

      wrapper.setState({iso_code: '11111111'});
      wrapper.setState({formattedNumber: '11111111'});
      wrapper.find('MiTextInput').simulate('change');

    } */

    @test("calls formatNumber with text = ''")
    test_formatNumber_1() {
      let input = new TelephoneInput({});
      const text = '';
      const pattern = '';
      expect(input.formatNumber(text, pattern)).to.equal('+');
    }

    @test("calls formatNumber with text = '1'")
    test_formatNumber_2() {
      let input = new TelephoneInput({});
      const text = '1';
      const pattern = '';
      expect(input.formatNumber(text, pattern)).to.equal('+1');
    }

    @test("calls formatNumber with text = '4161111234'")
    test_formatNumber_3() {
      let input = new TelephoneInput({});
      const text = '4161111234';
      const pattern = '/\d+/';
      expect(input.formatNumber(text, pattern)).to.equal('/d+/4161111234');
    }

    @test("calls formatNumber with text = '202.000.2222'")
    test_formatNumber_4() {
      let input = new TelephoneInput({});
      const text = '202.000.2222';
      const pattern = '/[0-9]{3}.[0-9]{3}.[0-9]{3}/';
      expect(input.formatNumber(text, pattern)).to.equal('/[0-9]{3}2[0-9]{3}0[0-9]{3}/2.000.2222');
    }

    @test("calls getCountryName")
    test_getCountryName() {
      let input = new TelephoneInput({});
      expect(input.getCountryName(123456)).to.equal('CA');
    }
}