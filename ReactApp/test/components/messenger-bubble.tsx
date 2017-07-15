import React, { Image, TextInput, Platform } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Bubble from '../../components/messenger-bubble';

@suite("<Bubble />")
class BubbleTest {

    @test("should render view when position = left")
    render_view_1() {
      const position: string = 'left';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };

      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} />);
     
      expect(wrapper.find('View')).to.have.length(6);
    }
   
   @test("should render view when position = right")
    render_view_2() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} />);
     
      expect(wrapper.find('View')).to.have.length(6);
    }

    @test("calls isSameDay with messages on the same dates")
    test_isSameDay_1() {
      let bubble = new Bubble({});
      const user: object = {
        _id: 123,
      };
      const currentMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      const diffMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      expect(bubble.isSameDay(currentMessage, diffMessage)).to.be.true;
    }

    @test("calls isSameDay with messages on different dates")
    test_isSameDay_2() {
      let bubble = new Bubble({});
      const user: object = {
        _id: 123,
      };
      const currentMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(98, 5, 24),
      };
      const diffMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(99, 5, 24),
      };
      expect(bubble.isSameDay(currentMessage, diffMessage)).to.be.false;
    }

    @test("calls isSameDay with invalid date")
    test_isSameDay_3() {
      let bubble = new Bubble({});
      const user: object = {
        _id: 123,
      };
      const currentMessage = {
        user: user,
        sent: 'hello',
        createdOn: '',
      };
      const diffMessage = {
        user: user,
        sent: 'hello',
        createdOn: '',
      };
      expect(bubble.isSameDay(currentMessage, diffMessage)).to.be.false;
    }

    @test("calls isSameUser with same users")
    test_isSameUser_1() {
      let bubble = new Bubble({});
      const user: object = {
        _id: 123,
      };
      const currentMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      const diffMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      expect(bubble.isSameUser(currentMessage, diffMessage)).to.be.true;
    }
    
    @test("calls isSameUser with different users")
    test_isSameUser_2() {
      let bubble = new Bubble({});
      const userA: object = {
        _id: 123,
      };
      const userB: object = {
        _id: 321,
      };
      const currentMessage = {
        user: userA,
        sent: 'hello',
        createdOn: new Date(),
      };
      const diffMessage = {
        user: userB,
        sent: 'hello',
        createdOn: new Date(),
      };
      expect(bubble.isSameUser(currentMessage, diffMessage)).to.be.false;
    }

    @test("should render view with different dates")
    render_view_3() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(98,5,24),
      };
      const diffMessage = {
        user: user,
        sent: 'hello',
        createdOn: new Date(99,5,24),
      };
      const wrapper = shallow(<Bubble previousMessage={diffMessage} currentMessage={currentMessage} user={user} position={position} />);
     
      expect(wrapper.find('View')).to.have.length(6);
    }

    @test("should render view with text")
    render_message_text() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(98,5,24),
        text: 'hello world'
      };
     
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} />);
     
      expect(wrapper.find('View')).to.have.length(6);
    }

    @test("should render view with image")
    render_message_image() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const photoUrl:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const imageSrc: object = {uri: photoUrl};
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(98,5,24),
        image: imageSrc
      };
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} />);
     
      expect(wrapper.find('View')).to.have.length(6);
    }
    
    @test("simulate long press event when onLongPress is defined")
    simulate_long_press_1() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(),
      };
      const onLongPress = () => {
        return true;
      };
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} onLongPress={onLongPress} />);
     
      expect(wrapper.find('View')).to.have.length(6);
      wrapper.find('TouchableWithoutFeedback').simulate('LongPress');

      //expect(wrapper.find('ActionSheet')).to.have.length(1);
    }

    @test("simulate long press event when onLongPress is undefined")
    simulate_long_press_2() {
      const position: string = 'right';
      const touchableProps: any = {

      };
      const user: object = {
        _id: 123,
      };
      const currentMessage: object ={
        user: user,
        sent: 'hello',
        createdOn: new Date(),
        text: 'helloworld'
      };
      const wrapper = shallow(<Bubble currentMessage={currentMessage} user={user} position={position} onLongPress={null} />);
     
      expect(wrapper.find('View')).to.have.length(6);
      wrapper.find('TouchableWithoutFeedback').simulate('LongPress');

      //expect(wrapper.find('ActionSheet')).to.have.length(1);
    }
    
}
