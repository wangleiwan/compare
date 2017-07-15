import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {Mobile} from '../../screens/Auth.Mobile';

@suite("<Mobile />")
class MobileTest {
    @test("render mobile verify form view")
    render_verify_1() {
      const auth = {
        error: null,
        user: {
          mobile: '202-010-1234'
        }
      }
      const wrapper = shallow(<Mobile auth={auth} />);
      wrapper.setState({needsResend: false});
      wrapper.setState({error: null});
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }

    @test("render mobile verify form view with error")
    render_verify_2() {
      const auth = {
        error: 400,
        user: {
          mobile: '202-010-1234'
        }
      }
      const wrapper = shallow(<Mobile auth={auth} />);
      wrapper.setState({needsResend: false});
      wrapper.setState({error: null});
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }

    @test("simulate back event")
    simulate_back() {
      const auth = {
        error: 400,
        user: {
          mobile: '202-010-1234'
        }
      };
      const navigator = {
        resetTo: () => {}
      };
      const clear = () => { auth.error = null; };
      const wrapper = shallow(<Mobile auth={auth} clearAuthError={clear} navigator={navigator} />);
      wrapper.setState({needsResend: false});
      wrapper.setState({error: null});
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 0)
          node.simulate('press');
      });
    }

    @test("simulate resend event")
    simulate_resend() {
      const auth = {
        error: 400,
        user: {
          mobile: '202-010-1234'
        }
      };
      const clear = () => { auth.error = null; };
      const sendVerify = (acct, user, type) => { return true; };
      const update = (user) => {};
      const wrapper = shallow(<Mobile auth={auth} clearAuthError={clear} updateUser={update} sendVerify={sendVerify} />);
      wrapper.setState({needsResend: true});
      wrapper.setState({error: null});
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      /*wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });*/
    }

    @test("simulate finish event")
    simulate_finish() {
      const auth = {
        error: 400,
        user: {
          mobile: '202-010-1234'
        }
      };
      const clear = () => { auth.error = null; };
      const verify = (acct, user, type, code) => { return true; };
      const wrapper = shallow(<Mobile auth={auth} clearAuthError={clear} verify={verify} />);
      wrapper.setState({needsResend: false});
      wrapper.setState({error: null});
      expect(wrapper.find('View')).to.have.length(6);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

}