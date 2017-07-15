import React, { Image, TextInput } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MiTransText from '../../components/MiTransText';
import AppConfig from '../../config';
import {Style} from '../../styles';
import I18n from 'react-native-i18n';
import Translations from '../../TranslationWrapper';

@suite("<MiTransText />")
class MiTransTextTest {

    camelize = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g,(ltr, idx) => ltr.toUpperCase()).replace(/\s+/g, '');

    @test("should render text with default settings")
    render_view_1() {
      const wrapper = shallow(<MiTransText />);
      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].color', 'white');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].textAlign', 'left');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[2].fontFamily', AppConfig.baseFont);
    }

    @test("should render text with custom settings")
    render_view_2() {
      const color: string = 'light';
      const type: string = 'h1';
      const center: boolean = true;
      const weight: string = 'light';
      const style: any = {};
      const children: string = 'hello world';

      const wrapper = shallow(
        <MiTransText
          color={color}
          type={type}
          center={center}
          weight={weight}
          style={style}
          children={children}/>
      );

      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[0].fontSize', Style.EM(1.75));
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].color', AppConfig.secondaryColor);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].textAlign', 'center');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[2].fontFamily', AppConfig.lightFont);
      expect(wrapper.find('Text').props().children).to.equal('hello world');
    }

    @test("should render translation")
    render_view_3() {
      const color: string = 'light';
      const type: string = 'h1';
      const center: boolean = true;
      const weight: string = 'light';
      const style: any = {};
      const children: string = 'Save';

      const wrapper = shallow(
        <MiTransText
          color={color}
          type={type}
          center={center}
          weight={weight}
          style={style}
          children={children}/>
      );

      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[0].fontSize', Style.EM(1.75));
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].color', AppConfig.secondaryColor);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].textAlign', 'center');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[2].fontFamily', AppConfig.lightFont);
      expect(wrapper.find('Text').props().children).to.equal(I18n.t(this.camelize(children)));
    }

}
