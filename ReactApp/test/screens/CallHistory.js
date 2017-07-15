import React from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import ModalDropdown from 'react-native-modal-dropdown';
import ListSearch from '../components/list.search';
import { CallHistory } from '../../screens/CallHistory';

@suite("<CallHistory />")
class CallHistoryTest {
     users = {
         mixed:
	   [ { createdOn: '2017-05-08T21:12:17.804Z',
	       modifiedOn: '2017-05-08T21:12:17.804Z',
	       accountId: 105990045,
	       name: 'Peter',
	       userId: 'peterw@dev6.com',
	       email: 'peterw@dev6.com',
	       role: 'USER',
	       emailVerified: true,
	       extensionVerified: false,
	       mobile: '+16478661140',
	       mobileVerified: true,
	       score: null,
	       phoneVerified: false,
	       sipAddress: 'peterw@mitel.mitel-api.com',
	       sipPassword: '833447942416',
	       createdBy: 'peterw@dev6.com',
	       modifiedBy: 'peterw@dev6.com' },
	     { createdOn: '2017-05-08T20:28:22.484Z',
	       modifiedOn: '2017-05-08T20:28:22.484Z',
	       accountId: 105990045,
	       name: 'Shu',
	       userId: 'szhangsyr@gmail.com',
	       email: 'szhangsyr@gmail.com',
	       role: 'USER',
	       emailVerified: false,
	       extensionVerified: false,
	       mobile: '+12269781212',
	       mobileVerified: false,
	       score: null,
	       phoneVerified: false,
	       sipAddress: 'szhangsyr@mitel.mitel-api.com',
	       sipPassword: '349188312794',
	       createdBy: 'szhangsyr@gmail.com',
	       modifiedBy: 'szhangsyr@gmail.com' }],
        mapped: { 'peterw@dev6.com':
	      { createdOn: '2017-05-08T21:12:17.804Z',
	        modifiedOn: '2017-05-08T21:12:17.804Z',
	        accountId: 105990045,
	        name: 'Peter',
	        userId: 'peterw@dev6.com',
	        email: 'peterw@dev6.com',
	        role: 'USER',
	        emailVerified: true,
	        extensionVerified: false,
	        mobile: '+16478661140',
	        mobileVerified: true,
	        score: null,
	        phoneVerified: false,
	        sipAddress: 'peterw@mitel.mitel-api.com',
	        sipPassword: '833447942416',
	        createdBy: 'peterw@dev6.com',
	        modifiedBy: 'peterw@dev6.com' },
	     'szhangsyr@gmail.com':
	      { createdOn: '2017-05-08T20:28:22.484Z',
	        modifiedOn: '2017-05-08T20:28:22.484Z',
	        accountId: 105990045,
	        name: 'Shu',
	        userId: 'szhangsyr@gmail.com',
	        email: 'szhangsyr@gmail.com',
	        role: 'USER',
	        emailVerified: false,
	        extensionVerified: false,
	        mobile: '+12269781212',
	        mobileVerified: false,
	        score: null,
	        phoneVerified: false,
	        sipAddress: 'szhangsyr@mitel.mitel-api.com',
	        sipPassword: '349188312794',
	        createdBy: 'szhangsyr@gmail.com',
	        modifiedBy: 'szhangsyr@gmail.com' }},
        loading: false,
        error: undefined
      };
    @test("render default view")
    render_view_1() {
      const wrapper = shallow(<CallHistory users={this.users} />);

      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ScrollView')).to.have.length(1);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
      expect(wrapper.find('ListSearch')).to.have.length(1);

    }

    @test("state.group = 'Missed'")
    render_view_2() {
      const wrapper = shallow(<CallHistory users={this.users} />);
      wrapper.setState({group: 'Missed'});
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ScrollView')).to.have.length(1);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
      expect(wrapper.find('ListSearch')).to.have.length(1);
    }

    @test("state.group = 'Voicemail'")
    render_view_3() {
      const wrapper = shallow(<CallHistory users={this.users} />);
      wrapper.setState({group: 'Voicemail'});
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ScrollView')).to.have.length(1);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
      expect(wrapper.find('ListSearch')).to.have.length(1);
    }

    @test("simulate change of tab")
    simulate_change_tab() {
      const wrapper = shallow(<CallHistory users={this.users} />);
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ScrollView')).to.have.length(1);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
      expect(wrapper.find('ListSearch')).to.have.length(1);

      wrapper.find('A').forEach(function(node, index){
          node.simulate('press');
      });
    }

    @test("call function adjustFrame")
    test_adjustFrame() {
      let callHistory = new CallHistory();
      let style = {
        right: 0
      };
      callHistory.adjustFrame(style);
      expect(style.right).to.equal(1);
    }

    @test("call function onSelect")
    test_onSelect() {
      let callHistory = new CallHistory();
      callHistory.onSelect();
    }

    @test("call function onDropdownWillShow")
    test_onDropdownWillShow() {
      let callHistory = new CallHistory();
      callHistory.onDropdownWillShow();
    }

    @test("call function onDropdownWillHide")
    test_onDropdownWillHide() {
      let callHistory = new CallHistory();
      callHistory.onDropdownWillHide();
    }
}
