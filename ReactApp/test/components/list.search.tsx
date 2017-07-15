import React, { Image, TextInput, Platform } from 'react-native';
import { render, mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import ReactNativeMock from 'react-native-mock';
import ListSearch from '../../components/list.search';
import MiTextInput from '../../components/MiTextInput';

require("react-native-mock/mock");

@suite("<ListSearch />")
class ListSearchTest {

    @test("should render view with default settings")
    render_view_1() {
      const wrapper = shallow(<ListSearch />);
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('Icon')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }
    
   @test("should render view with custom settings")
    render_view_2() {
      const type: string = 'solid';
      const size: number = 10;
      const wrapper = shallow(
        <ListSearch 
          size={size}
          type={type}
          />);
          
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('Icon')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      
      wrapper.find('View').forEach(function (node, index) {
        if(index === 0){
          expect(node.props().style[1]).to.eql({
            backgroundColor: 'rgba(255,255,255,1)', 
            height: size
          });  
        }
      });
    }

    @test("simulate change of search text")
    render_view_3() {
      const type: string = 'solid';
      const size: number = 10;
      let searchTerm: string = 'react-native';
      let searchThis: string = '';
      const onChangeText: () => {} = () => searchThis = searchTerm;
      const wrapper = shallow(
        <ListSearch 
          size={size}
          type={type}
          searchTerm={searchTerm}
          onChangeText={onChangeText}
          />);
          
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('Icon')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      
      expect(wrapper.find('MiTextInput').props().value).to.not.equal(searchThis);
      wrapper.find('MiTextInput').simulate('ChangeText');
      expect(wrapper.find('MiTextInput').props().value).to.equal(searchThis);
    }

    @test("should return paddingBottom match device's OS(android)")
    platform_android() {
        ReactNativeMock.Platform.OS = 'android';
        //console.log('platform.os', Platform.OS);
        const type: string = 'solid';
        const size: number = 10;
        const wrapper = shallow(
          <ListSearch 
            size={size}
            type={type}
            />);
            
        expect(wrapper.find('View')).to.have.length(2);
        expect(wrapper.find('Icon')).to.have.length(1);
        expect(wrapper.find('MiTextInput')).to.have.length(1);
        //console.log(wrapper.find('MiTextInput').props().style);
        expect(wrapper.find('MiTextInput').props().style).to.have.deep.property('[0].paddingBottom',6);
    }

    @test("should return paddingBottom match device's OS(ios)")
    platform_ios() {
        ReactNativeMock.Platform.OS = 'ios';
        //console.log('platform.os', Platform.OS);
        const type: string = 'solid';
        const size: number = 10;
        const wrapper = shallow(
          <ListSearch 
            size={size}
            type={type}
            />);
            
        expect(wrapper.find('View')).to.have.length(2);
        expect(wrapper.find('Icon')).to.have.length(1);
        expect(wrapper.find('MiTextInput')).to.have.length(1);
        //console.log(wrapper.find('MiTextInput').props().style);
        expect(wrapper.find('MiTextInput').props().style).to.have.deep.property('[0].paddingBottom',0);
    }

}
