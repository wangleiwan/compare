import React from 'react-native';
import MapView from 'react-native-maps';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import CustomView from '../../components/messenger-custom';

@suite("<CustomView />")
class CustomViewTest {

    @test("should render blank view when currentMessage has no location data")
    render_view_1() {
      const currentMessage: object = {
        location: null
      };
      const wrapper = shallow(<CustomView currentMessage={currentMessage} />);
      expect(wrapper.find('TouchableOpacity')).to.not.exist;
      expect(wrapper.find('MapView')).to.not.exist;
    }
   
   @test("should render view when currentMessage has location data")
    render_view_2() {
      const currentMessage: any = {
        location: {
          latitude: 37.78825,
          longitude: -122.4324
        }
      };
      const wrapper = shallow(<CustomView currentMessage={currentMessage} />);
      wrapper.find('TouchableOpacity').simulate('press');
      expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      //expect(wrapper.find(MapView)).to.have.length(1);
      //expect(wrapper.find(MapView.Marker)).to.have.length(1);
    }

}
