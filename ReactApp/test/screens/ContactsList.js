import React from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { ContactsList } from '../../screens/ContactsList';

@suite("<ContactsList />")
class ContactsListTest {

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

			navigator = [];

			onPress = () => {};

    @test("render default view")
    render_view_1() {
      const wrapper = shallow(<ContactsList users={this.users} />);

      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
			expect(wrapper.find('ScrollView')).to.have.length(1);
			expect(wrapper.find('ListSearch')).to.have.length(1);
			expect(wrapper.find('ListSwipeRow')).to.have.length(2);
    }

		@test("state.group = 'Business'")
    render_view_2() {
      const wrapper = shallow(<ContactsList users={this.users} />);
      wrapper.setState({group: 'Busness'});
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
			expect(wrapper.find('ScrollView')).to.have.length(1);
			expect(wrapper.find('ListSearch')).to.have.length(1);
			expect(wrapper.find('ListSwipeRow')).to.have.length(2);
    }

    @test("state.group = 'Personal'")
    render_view_3() {
      const wrapper = shallow(<ContactsList users={this.users} />);
      wrapper.setState({group: 'Personal'});
      expect(wrapper.find('View')).to.have.length(7);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(3);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      expect(wrapper.find('ModalDropdown')).to.have.length(1);
			expect(wrapper.find('ScrollView')).to.have.length(1);
			expect(wrapper.find('ListSearch')).to.have.length(1);
			expect(wrapper.find('ListSwipeRow')).to.have.length(1);
    }

    @test("simulate clicks on component <A>")
    simulate_clicks_A() {
      const wrapper = shallow(<ContactsList users={this.users} />);

      wrapper.find('A').forEach(function(node){
        node.simulate('press');
      });
    }

		@test("call function adjustFrame")
    test_adjustFrame() {
      let contactsList = new ContactsList({props: {filter: () => {}}});
      let style = {
        right: 0
      };
      contactsList.adjustFrame(style);
      expect(style.right).to.equal(1);
    }

    @test("call function onSelect")
    test_onSelect() {
      let contactsList = new ContactsList({props: {filter: () => {}}});
      contactsList.onSelect();
    }

    @test("call function onDropdownWillShow")
    test_onDropdownWillShow() {
      let contactsList = new ContactsList({props: {filter: () => {}}});
      contactsList.onDropdownWillShow();
    }

    @test("call function onDropdownWillHide")
    test_onDropdownWillHide() {
      let contactsList = new ContactsList({props: {filter: () => {}}});
      contactsList.onDropdownWillHide();
    }

}
