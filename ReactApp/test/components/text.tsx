import React, { Image, TextInput } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MiText from '../../components/text';
import AppConfig from '../../config';
import {Style} from '../../styles';

@suite("<MiText />")
class MiTextTest {

    @test("should render view with default settings")
    render_view_1() {
      const wrapper = shallow(<MiText />);
      expect(wrapper.find('Text')).to.have.length(1);
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].color', '#FFF');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[1].textAlign', 'left');
      expect(wrapper.find('Text').props().style).to.have.deep.property('[2].fontFamily', AppConfig.baseFont);
    }

    @test("should render view with custom settings")
    render_view_2() {
      const color: string = 'light';
      const type: string = 'h1';
      const center: boolean = true;
      const weight: string = 'light';
      const style: any = {};
      const children: string = 'hello world';

      const wrapper = shallow(
        <MiText
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
    }

}
