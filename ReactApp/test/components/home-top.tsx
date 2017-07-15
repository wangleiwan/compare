import React, { Image, TextInput } from 'react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import HomeTop from '../../components/home-top';

@suite("<HomeTop />")
class HomeTopTest {

    @test("should render view when pushToTalk = false")
    render_view_1() {
      const pushToTalk: boolean = false;
      let isActivated: boolean = false;
      const activateDialPad: () => {} = () => isActivated = true;
      const wrapper = shallow(<HomeTop pushToTalk={pushToTalk} activateDialPad={activateDialPad} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(1);
    }

    @test("should render view when pushToTalk = true")
    render_view_2() {
      const pushToTalk: boolean = true;
      let isActivated: boolean = false;
      const activateDialPad: () => {} = () => isActivated = true;
      const wrapper = shallow(<HomeTop pushToTalk={pushToTalk} activateDialPad={activateDialPad} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(1);
    }
    
    @test("simulates onPress event")
    render_view_3() {
      const pushToTalk: boolean = true;
      let isActivated: boolean = false;
      const activateDialPad: () => {} = () => isActivated = true;
      const wrapper = shallow(<HomeTop pushToTalk={pushToTalk} activateDialPad={activateDialPad} />);
      
      wrapper.find('A').simulate('press');

      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(isActivated).to.be.true;
    }

}
