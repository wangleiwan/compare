import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {Email} from '../../screens/Auth.Email';

@suite("<Email />")
class EmailTest {
   @test("should render verify form view when finish = false")
    render_verify_1() {
      const wrapper = shallow(<Email />);
      expect(wrapper.find('View')).to.have.length(5);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Please click the link provided in your email');
      expect(wrapper.find('Button')).to.have.length(3);
    }

    @test("simulate back when finish = false")
    render_verify_1_1() {
      let error = "something";
      const clear = () => { error = ""; };
      const navigator = [{route: '1'},{route: '2'}];
      const wrapper = shallow(<Email clearAuthError={clear} navigator={navigator} />);
      expect(wrapper.find('View')).to.have.length(5);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Please click the link provided in your email');
      expect(wrapper.find('Button')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 0)
          node.simulate('press');
      });
    }
    /*
    @test("simulate resend when finish = false")
    render_verify_1_2() {
      const auth = {
          user: {
              accountId: '105990012',
              userId: "abc@example.com"
          }
      };
      const sendVerify = () => { return true};
      const clearAuth = () => {};
      const wrapper = shallow(<Email auth={auth} clearAuth={clearAuth} sendVerify={sendVerify} />);
      expect(wrapper.find('View')).to.have.length(5);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Please click the link provided in your email');
      expect(wrapper.find('Button')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }*/

    @test("should render verify form view when finish without error")
    render_verify_2() {
      const data = {};
      const auth = {};
      const wrapper = shallow(<Email data={data} auth={auth} />);
      wrapper.setState({finished: true});
      expect(wrapper.find('View')).to.have.length(5);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Email successfully verified');
      expect(wrapper.find('Button')).to.have.length(3);
    }

    @test("simulate back when finish without error")
    render_verify_2_1() {
      const data = {};
      const auth = {};
      let error = "something";
      const clear = () => { error = ""; };
      const navigator = [{route: '1'},{route: '2'}];
      const wrapper = shallow(<Email data={data} auth={auth} clearAuthError={clear} navigator={navigator}/>);
      wrapper.setState({finished: true});
      expect(wrapper.find('View')).to.have.length(5);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Email successfully verified');
      expect(wrapper.find('Button')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 0)
          node.simulate('press');
      });
    }
/*
    @test("simulate resend when finish without error")
    render_verify_2_2() {
      const data = {};
      const auth = {
          user: {
              accountId: '105990012',
              userId: "abc@example.com"
          }
      };
      const sendVerify = () => { return true};
      const clearAuth = () => {};
      const wrapper = shallow(<Email data={data} clearAuth={clearAuth} auth={auth} sendVerify={sendVerify} />);
      wrapper.setState({finished: true});
      expect(wrapper.find('View')).to.have.length(4);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Email successfully verified');
      expect(wrapper.find('Button')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }*/

    @test("should render verify form view when finish with error code")
    render_verify_3() {
      const data = {
        code: 400
      };
      const auth = {
        error: 'server error'
      };
      const wrapper = shallow(<Email data={data} auth={auth} />);
      wrapper.setState({finished: true, error: true});
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      // expect(wrapper.find('MiTransText').props().children).to.equal(auth.error);
      expect(wrapper.find('Button')).to.have.length(0);
    }

    @test("should render verify form view when finish = false with error code")
    render_verify_4() {
      const data = {
        code: 400
      };
      const auth = {
        
      };
      const wrapper = shallow(<Email data={data} auth={auth} />);
      expect(wrapper.find('View')).to.have.length(4);
      expect(wrapper.find('Image')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal('Confirming your email...');
      expect(wrapper.find('Button')).to.have.length(0);
    }

    @test("should render resend view")
    render_resend_1() {
      const wrapper = shallow(<Email />);
      wrapper.setState({resent: true})
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('Image')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(1);
    }

}