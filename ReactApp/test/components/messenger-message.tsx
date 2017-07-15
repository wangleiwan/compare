import React, { Image, TextInput, Platform } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Message from '../../components/messenger-message';

@suite("<Message />")
class MessageTest {
  @test("should render view when position = left")
    render_view_1() {
      const position: string = 'left';
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: {
          _id: 321
        },
        sent: 'hello',
        createdOn: new Date(),
      };
      const wrapper = shallow(
        <Message 
          currentMessage={currentMessage} 
          user={user} 
          position={position} 
        />);
     
      expect(wrapper.find('View')).to.have.length(3);
    }
   
   @test("should render view when position = right")
    render_view_2() {
      const position: string = 'right';
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: {
          _id: 321
        },
        sent: 'hello',
        createdOn: new Date(),
      };
      const wrapper = shallow(
        <Message 
          currentMessage={currentMessage} 
          user={user} 
          position={position} 
        />);
     
      expect(wrapper.find('View')).to.have.length(3);
    }
    
}
