import React, { Image, TextInput, Platform } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Icon from 'react-native-vector-icons/Ionicons';
import MessengerActions from '../../components/messenger-actions';

@suite("<MessengerActions />")
class MessengerActionsTest {

    @test("should render view with default settings")
    render_view_1() {
      const wrapper = shallow(<MessengerActions />);
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('MiText')).to.have.length(1);
    }
   
   @test("should render view with custom settings")
    render_view_2() {
      let isSent: boolean = false;
      const onSend: any = () => isSent = true;
      const icon: any = () => {
        return (<Icon style={{marginLeft: 1, marginTop: 2}} name={'ios-document'} size={10} color={"#000"} />);
      };
      const wrapperStyle: object = {};
      const iconTextStyle: object = {};
      const containerStyle: object = {};

      const wrapper = shallow(
        <MessengerActions 
          icon = {icon}
          onSend = {onSend}
          wrapperStyle = {wrapperStyle}
          iconTextStyle = {iconTextStyle}
          containerStyle = {containerStyle}
          />);
          
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(0);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('Icon')).to.have.length(1);
    }

    @test("simulate onActionPress event")
    render_view_3() {
      let isSent: boolean = false;
      const onSend: any = () => isSent = true;
      const icon: any = () => {
        return (<Icon style={{marginLeft: 1, marginTop: 2}} name={'ios-document'} size={10} color={"#000"} />);
      };
      const wrapperStyle: object = {};
      const iconTextStyle: object = {};
      const containerStyle: object = {};

      const wrapper = shallow(
        <MessengerActions 
          icon = {icon}
          onSend = {onSend}
          wrapperStyle = {wrapperStyle}
          iconTextStyle = {iconTextStyle}
          containerStyle = {containerStyle}
          />);
          
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(0);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('Icon')).to.have.length(1);

      wrapper.find('TouchableOpacity').simulate('press');

      //expect(wrapper.find('ActionSheet')).to.have.length(1);
    }

    @test("test function setImages")
    test_setImages() {
      let messengerActions = new MessengerActions({});
      const photoUrl1:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const photoUrl2:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const photoUrl3:string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';

      const images = [{
        uri: photoUrl1,
        name: 'photo1'
      },{
        uri: photoUrl2,
        name: 'photo2'
      },{
        uri: photoUrl3,
        name: 'photo3'
      }];
      messengerActions.setImages(images);
      expect(messengerActions._images).to.eql(images);
    }

    @test("test function getImages")
    test_getImages() {
      let messengerActions = new MessengerActions({});
      const images = messengerActions.getImages();
      expect(messengerActions._images).to.eql(images);
    }

    @test("test function setModalVisible()")
    test_setModalVisible() {
      let messengerActions = new MessengerActions({});
      messengerActions.setModalVisible();
      //console.log('state', messengerActions.state);
    }

    @test("test function setModalVisible(false)")
    test_setModalVisible_false() {
      let messengerActions = new MessengerActions({});
      messengerActions.setModalVisible(false);
      //console.log('state', messengerActions.state);
    }

    @test("test function setModalVisible(true)")
    test_setModalVisible_true() {
      let messengerActions = new MessengerActions({});
      messengerActions.setModalVisible(true);
      //console.log('state', messengerActions.state);
    }

}
