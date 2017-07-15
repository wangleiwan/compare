import React, { Image, TextInput } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import ListRow from '../../components/list.row';

@suite("<ListRow />")
class ListRowTest {

    @test("should render view with default settings")
    render_view_1() {
      const wrapper = shallow(<ListRow />);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Avatar')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(1);
      expect(wrapper.find('MiText')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }
    
    @test("should render view with custom settings")
    render_view_2() {
      const color: string = 'black';
      const size: number = 10;
      const imageSrc: object = {

      };
      const leftText: string = 'left text';
      const rightText: string = 'right text';
      const rightIcon: string = 'right icon';
      const disabled: boolean = false;
      let isClicked: boolean = false;
      const onClick: () => {} = () => isClicked = true;
      const wrapper = shallow(
        <ListRow 
          color={color}
          disabled={disabled} 
          size={size}
          imageSrc={imageSrc}
          leftText={leftText}
          rightText={rightText}
          rightIcon={rightIcon}
          onClick={onClick}
          />);
          
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Avatar')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(1);
      expect(wrapper.find('MiText')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("simulates onPress event when disabled = true")
    render_view_3() {
      const color: string = 'black';
      const size: number = 10;
      const imageSrc: object = {

      };
      const leftText: string = 'left text';
      const rightText: string = 'right text';
      const rightIcon: string = 'right icon';
      const disabled: boolean = true;
      let isClicked: boolean = false;
      const onClick: () => {} = () => isClicked = true;
      const wrapper = shallow(
        <ListRow 
          color={color}
          disabled={disabled} 
          size={size}
          imageSrc={imageSrc}
          leftText={leftText}
          rightText={rightText}
          rightIcon={rightIcon}
          onClick={onClick}
          />);

      wrapper.find('A').simulate('press');

      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Avatar')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(1);
      expect(wrapper.find('MiText')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(isClicked).to.be.false;
    }
    
   @test("simulates onPress event when disabled = false")
    render_view_4() {
      const color: string = 'black';
      const size: number = 10;
      const imageSrc: object = {

      };
      const leftText: string = 'left text';
      const rightText: string = 'right text';
      const rightIcon: string = 'right icon';
      const disabled: boolean = false;
      let isClicked: boolean = false;
      const onClick: () => {} = () => isClicked = true;
      const wrapper = shallow(
        <ListRow 
          color={color}
          disabled={disabled} 
          size={size}
          imageSrc={imageSrc}
          leftText={leftText}
          rightText={rightText}
          rightIcon={rightIcon}
          onClick={onClick}
          />);

      wrapper.find('A').simulate('press');

      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Avatar')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(1);
      expect(wrapper.find('MiText')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(isClicked).to.be.true;
    }

}
