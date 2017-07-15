import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Avatar from '../../components/avatar';

@suite("<Avatar />")
class AvatarTest {

    @test("should render stuff")
    render_view() {
      const name: string = '';
      const width: number = 0;
      const height: number = 0;
      const isNewContact = false;
      const imageSrc: object = null;
      const wrapper = shallow(<Avatar isNewContact={isNewContact} name={name} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('View')).to.have.length(1);
    }

    @test("should render avatar image with name contains no seperator")
    render_image_1() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = 'jsmith@mitelcom';
      const width: number = 100;
      const height: number = 100;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render avatar image with name as '-'")
    render_image_2() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = '-';
      const width: number = 100;
      const height: number = 100;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render avatar image with name contains '@'")
    render_image_3() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = 'jsmith@mitel.com';
      const width: number = 100;
      const height: number = 100;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render avatar image with name contains '<' and '>'")
    render_image_4() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = 'John.Smith <jsmith@mitel.com>';
      const width: number = 100;
      const height: number = 100;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render avatar image with size smaller than 60")
    render_image_5() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = 'John.Smith <jsmith@mitel.com>';
      const width: number = 10;
      const height: number = 10;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render avatar image with size larger than 60")
    render_image_6() {
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const name: string = 'John.Smith <jsmith@mitel.com>';
      const width: number = 100;
      const height: number = 100;
      const isNewContact = false;
      const imageSrc: object = {uri: photoUrl};
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should not render avatar image without source")
    render_image_7() {
      const name: string = 'John.Smith <jsmith@mitel.com>';
      const width: number = 100;
      const height: number = 100;
      const imageSrc: object = null;
      const isNewContact = false;
      const wrapper = shallow(<Avatar name={name} isNewContact={isNewContact} width={width} height={height} imageSrc={imageSrc} />);
      expect(wrapper.find('Image')).to.not.exist;
    }

}
