import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Main  from '../../screens/Main';
import Home from '../../screens/Home';
import ContactsList from '../../screens/ContactsList';
import Search from '../../screens/Search';

@suite("<Main />")
class MainTest {
	@test("render default view")
	render_view_1() {
		const wrapper = shallow(<Main />);
		
		expect(wrapper.find('ScrollableTabView')).to.have.length(1);
		expect(wrapper.find('View')).to.have.length(6);
		expect(wrapper.find(Home)).to.have.length(1);
		expect(wrapper.find(Search)).to.have.length(0);
		expect(wrapper.find(ContactsList)).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(0);		
	}

	@test("render view when msgrModal = true")
	render_view_2() {
		const wrapper = shallow(<Main />);
		wrapper.setState({msgrModal: true});
		expect(wrapper.find('ScrollableTabView')).to.have.length(1);
		expect(wrapper.find('View')).to.have.length(6);
		expect(wrapper.find(Home)).to.have.length(1);
		expect(wrapper.find(Search)).to.have.length(0);
		expect(wrapper.find(ContactsList)).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(2);		
	}

	@test("render view when chModal = true")
	render_view_3() {
		const wrapper = shallow(<Main />);
		wrapper.setState({chModal: true});
		expect(wrapper.find('ScrollableTabView')).to.have.length(1);
		expect(wrapper.find('View')).to.have.length(6);
		expect(wrapper.find(Home)).to.have.length(1);
		expect(wrapper.find(Search)).to.have.length(0);
		expect(wrapper.find(ContactsList)).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(2);		
	}

	@test("render view when searchModal = true")
	render_view_4() {
		const wrapper = shallow(<Main />);
		wrapper.setState({searchModal: true});
		expect(wrapper.find('ScrollableTabView')).to.have.length(1);
		expect(wrapper.find('View')).to.have.length(8);
		expect(wrapper.find(Home)).to.have.length(1);
		expect(wrapper.find(Search)).to.have.length(2);
		expect(wrapper.find(ContactsList)).to.have.length(1);
		expect(wrapper.find('Overlay')).to.have.length(2);		
	}

	@test("call function componentDidMount")
	test_componentDidMount() {
		let main = new Main();
		main.componentDidMount();
	}

	@test("call function navigate")
	test_navigate() {
		let main = new Main();
		main.props = {
			navigator: [{route: '/path'}]
		};
		main.navigate("home", 0);
	}
}