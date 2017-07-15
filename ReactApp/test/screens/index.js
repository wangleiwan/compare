import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { IndexPage } from '../../screens/index';

@suite("<IndexPage />")
class IndexPageTest {

	auth = { data: 
	   { tokenType: 'bearer',
	     expiresIn: 167,
	     accessToken: 'eyJhY2N=',
	     refreshToken: 'eyJhY2Nvd=',
	     scope: 'read write',
	     websocketUrl: 'wss://a1h36x35tzp1bw.iot.us-east-1.amazonaws.com/XXXXX'},
	  user: {},
	  loading: false,
	  error: null,
	  init: true 
	};

	@test("render default view")
	render_view_1() {
	  const wrapper = shallow(<IndexPage auth={this.auth} />);

	  expect(wrapper.find('View')).to.have.length(3);
	  expect(wrapper.find('Image')).to.have.length(2);
  	expect(wrapper.find('Button')).to.have.length(0);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	}

	@test("render default view without login")
	render_view_2() {
	  this.auth.data.accessToken = null;
	  const wrapper = shallow(<IndexPage auth={this.auth} />);

	  expect(wrapper.find('View')).to.have.length(4);
	  expect(wrapper.find('Image')).to.have.length(2);
  	expect(wrapper.find('Button')).to.have.length(2);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	}

	@test("simulate clicks on Login button")
	clicks_login() {
	  this.auth.data.accessToken = null;
	  const wrapper = shallow(<IndexPage auth={this.auth} />);

	  expect(wrapper.find('View')).to.have.length(4);
	  expect(wrapper.find('Image')).to.have.length(2);
  	expect(wrapper.find('Button')).to.have.length(2);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	 
	  wrapper.find('Button').forEach(function(node, index){
		  if(index == 0)
		    node.simulate('press');
	  });
	}

	@test("simulate clicks on Register button")
	clicks_register() {
	  this.auth.data.accessToken = null;
	  const wrapper = shallow(<IndexPage auth={this.auth} />);

	  expect(wrapper.find('View')).to.have.length(4);
	  expect(wrapper.find('Image')).to.have.length(2);
  	expect(wrapper.find('Button')).to.have.length(2);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	 
	  wrapper.find('Button').forEach(function(node, index){
		  if(index == 1)
		    node.simulate('press');
	  });
	}
}