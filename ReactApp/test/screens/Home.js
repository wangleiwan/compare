import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Home } from '../../screens/Home';

@suite("<Home />")
class HomeTest {
    users = {
        mappedGroups: {},
        mappedUsers: { 'szhangsyr@gmail.com':
          { createdOn: '2017-05-05T15:15:53.515Z',
            modifiedOn: '2017-05-05T15:15:53.515Z',
            accountId: 105990045,
            name: 'Shu',
            userId: 'szhangsyr@gmail.com',
            email: 'szhangsyr@gmail.com',
            role: 'USER',
            emailVerified: true,
            extensionVerified: false,
            mobile: '+12269781212',
            mobileVerified: false,
            score: null,
            phoneVerified: false,
            sipAddress: 'szhangsyr@mitel.mitel-api.com',
            sipPassword: '848536624013',
            createdBy: 'szhangsyr@gmail.com',
            modifiedBy: 'szhangsyr@gmail.com' },
         'wangleiwan@hotmail.com':
          { createdOn: '2017-05-04T19:34:48.678Z',
            modifiedOn: '2017-05-04T19:34:48.678Z',
            accountId: 105990045,
            name: 'Peterr',
            userId: 'wangleiwan@hotmail.com',
            email: 'wangleiwan@hotmail.com',
            role: 'USER',
            emailVerified: true,
            extensionVerified: false,
            mobile: '+16478661140',
            mobileVerified: true,
            score: null,
            phoneVerified: false,
            sipAddress: 'wangleiwan@mitel.mitel-api.com',
            sipPassword: '960680665587',
            createdBy: 'wangleiwan@hotmail.com',
            modifiedBy: 'wangleiwan@hotmail.com' } },
    }
	favorites = {
		order:
			[ 'szhangsyr@gmail.com',
				'wangleiwan@hotmail.com',
				'hasan.ibrahim.ahmad@gmail.com',
				'brandon.leigh-bennett@mitel.com',
				'chris.koch@mitel.com',
				'kajan00@gmail.com' ],
		contactModal: false,
		editing: false,
		inited: true,
		error: undefined
	};

	@test("render default view")
	render_view_1() {
		const wrapper = shallow(<Home users={this.users} favorites={this.favorites} />);

		expect(wrapper.find('View')).to.have.length(1);
		expect(wrapper.find('HomeTop')).to.have.length(1);
		expect(wrapper.find('HomeControls')).to.have.length(1);
		expect(wrapper.find('HomeFavorites')).to.have.length(0);
		expect(wrapper.find('Overlay')).to.have.length(0);
		expect(wrapper.find('ContactsList')).to.have.length(0);
		expect(wrapper.find('DialPad')).to.have.length(0);
	}

	@test("render different OS platforms")
    render_view_2() {
		ReactNativeMock.Platform.OS = 'android';
		const wrapper = shallow(<Home users={this.users} favorites={this.favorites} />);

		expect(wrapper.find('View')).to.have.length(1);
		expect(wrapper.find('HomeTop')).to.have.length(1);
		expect(wrapper.find('HomeControls')).to.have.length(1);
		expect(wrapper.find('HomeFavorites')).to.have.length(0);
		expect(wrapper.find('Overlay')).to.have.length(0);
		expect(wrapper.find('ContactsList')).to.have.length(0);
		expect(wrapper.find('DialPad')).to.have.length(0);
	}

	@test("display dialpad")
	render_dialpad() {
		const wrapper = shallow(<Home users={this.users} favorites={this.favorites} />);
		wrapper.setState({dialPad: true});

		expect(wrapper.find('View')).to.have.length(1);
		expect(wrapper.find('HomeTop')).to.have.length(1);
		expect(wrapper.find('HomeControls')).to.have.length(1);
		expect(wrapper.find('HomeFavorites')).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(1);
		expect(wrapper.find('ContactsList')).to.have.length(0);
		expect(wrapper.find('DialPad')).to.have.length(0);
	}

	@test("inited = false")
	render_dialpad() {
		this.favorites.inited = false;
		const wrapper = shallow(<Home users={this.users} favorites={this.favorites} />);

		expect(wrapper.find('View')).to.have.length(1);
		expect(wrapper.find('HomeTop')).to.have.length(1);
		expect(wrapper.find('HomeControls')).to.have.length(1);
		expect(wrapper.find('HomeFavorites')).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(1);
		expect(wrapper.find('ContactsList')).to.have.length(0);
		expect(wrapper.find('DialPad')).to.have.length(0);
	}

	@test("contactModal = true")
	render_dialpad() {
		this.favorites.contactModal = true;
		const wrapper = shallow(<Home users={this.users} favorites={this.favorites} />);

		expect(wrapper.find('View')).to.have.length(2);
		expect(wrapper.find('HomeTop')).to.have.length(1);
		expect(wrapper.find('HomeControls')).to.have.length(1);
		expect(wrapper.find('HomeFavorites')).to.have.length(0);
		expect(wrapper.find('Overlay')).to.have.length(1);
		expect(wrapper.find('ContactsList')).to.have.length(0);
		expect(wrapper.find('DialPad')).to.have.length(0);
	}

}
