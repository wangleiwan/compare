import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Settings } from '../../screens/Settings';

@suite("<Settings />")
class SettingsTest {
	navigator: Array<any> = [{route: '/path'}];
	user = {
		userId: 'jamesm@dev6.com',
		photoUrl: '',
		name: 'james mcg'
	}

	@test("render default view")
	render_view_1() {
		const wrapper = shallow(<Settings navigator={this.navigator} user={this.user}/>);
		expect(wrapper.find('ScrollView')).to.have.length(1);
		expect(wrapper.find('ListView')).to.have.length(1);
		expect(wrapper.find('A')).to.have.length(1);
		expect(wrapper.find('MiText')).to.have.length(7);
		expect(wrapper.find('Avatar')).to.have.length(1);
		expect(wrapper.find('Status')).to.have.length(1);
		expect(wrapper.find('Image')).to.have.length(4);
	}

	@test("test function renderRow with switch component")
	test_renderRow_1() {
		const rowData = { label: 'Reception Mode', type: 'switch', func: () => { } };
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.renderRow(rowData, 0, 0);
	}

	@test("test function renderRow with logout icon")
	test_renderRow_2() {
		const rowData = { label: 'Logout', type: 'logout', func: () => { } };
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.renderRow(rowData, 0, 0);
	}

	@test("test function renderRow with subsettings")
	test_renderRow_3() {
		const rowData = { label: 'General', type: 'arrow', func: () => { } };
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.renderRow(rowData, 0, 0);
	}

	@test("test function renderSeparator")
	test_renderSeparator() {
		const rowData = { label: 'Reception Mode', type: 'switch', func: () => { } };
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.renderSeparator(0, 0);
	}

	@test("test function pressRow")
	test_pressRow() {
	    const rowData = { label: 'Reception Mode', type: 'switch', func: () => { } };
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.pressRow(0, rowData);
	}

	/*@test("test function goToGeneral")
	test_goToGeneral() {
		let settings = new Settings({navigator: this.navigator, user: this.user});
		settings.goToGeneral();
	}*/
}