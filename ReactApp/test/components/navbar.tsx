import React, {Animated} from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {TabBar} from '../../components/navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';

@suite("<TabBar />")
class TabBarTest {
   @test("should render default view")
    render_view_1() {
      const favorites = {
        editing: false,
        order: [0,1,2,3,4],
        data: [{
                name: 'I',
              },
              {
                name: 'II',
              },
              {
                name: 'III',
              },
              {
                name: 'IV',
              },
              {
                name: 'V',
              }]
      };

      const tabs: Array<any> = [
        { icon: 'home',           overlay: false },
        { icon: 'chat',           overlay: true },
        { icon: 'contacts',       overlay: false },
        { icon: 'callhistory',    overlay: true },
        { icon: 'search',         overlay: true },
      ];
      const activeTab: number = 0;
    
      const wrapper = shallow(
        <TabBar 
          activeTab={activeTab}
          tabs={tabs}
          favorites={favorites}
           />);
      
      expect(wrapper.find('SwipeRow')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(24);
      expect(wrapper.find('TouchableOpacity')).to.have.length(5+tabs.length);
      //expect(wrapper.find('MiTransText')).to.have.length(3);
      //expect(wrapper.find('Status')).to.have.length(3);
      expect(wrapper.find(Ionicons)).to.have.length(0);
    }

    @test("should render edit view")
    render_view_2() {
      const favorites = {
        editing: true,
        order: [0,1,2,3,4],
        data: [{
                name: 'I',
              },
              {
                name: 'II',
              },
              {
                name: 'III',
              },
              {
                name: 'IV',
              },
              {
                name: 'V',
              }]
      };

      const tabs: Array<any> = [
        { icon: 'home',           overlay: false },
        { icon: 'chat',           overlay: true },
        { icon: 'contacts',       overlay: false },
        { icon: 'callhistory',    overlay: true },
        { icon: 'search',         overlay: true },
      ];
      const activeTab: number = 0;
    
      const wrapper = shallow(
        <TabBar 
          activeTab={activeTab}
          tabs={tabs}
          favorites={favorites}
           />);
      
      expect(wrapper.find('SwipeRow')).to.have.length(0);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('TouchableOpacity')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(0);
      expect(wrapper.find(Ionicons)).to.have.length(0);
    }

    @test("should render edit view with contact modal")
    render_view_3() {
      const favorites = {
        editing: true,
        contactModal: true,
        order: [0,1,2,3,4],
        data: [{
                name: 'I',
              },
              {
                name: 'II',
              },
              {
                name: 'III',
              },
              {
                name: 'IV',
              },
              {
                name: 'V',
              }]
      };

      const tabs: Array<any> = [
        { icon: 'home',           overlay: false },
        { icon: 'chat',           overlay: true },
        { icon: 'contacts',       overlay: false },
        { icon: 'callhistory',    overlay: true },
        { icon: 'search',         overlay: true },
      ];
      const activeTab: number = 0;
    
      const wrapper = shallow(
        <TabBar 
          activeTab={activeTab}
          tabs={tabs}
          favorites={favorites}
           />);
      
      expect(wrapper.find('SwipeRow')).to.have.length(0);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('TouchableOpacity')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('Status')).to.have.length(0);
      expect(wrapper.find(Ionicons)).to.have.length(0);
    }

    @test("test function componentDidMount")
    test_componentDidMount() {
      let tabBar = new TabBar({scrollValue: new Animated.Value(10)});
      tabBar.componentDidMount();
    }

    @test("test function setAnimationValue")
    test_setAnimationValue() {
      let tabBar = new TabBar({scrollValue: new Animated.Value(0)});
      tabBar.setAnimationValue({value: new Animated.Value(10)});
    }

    @test("test function iconColor")
    test_iconColor() {
      let tabBar = new TabBar({});
      tabBar.iconColor(10);
    }
    
}