import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Search } from '../../screens/Search';

@suite("<Search />")
class SearchTest {
	
	@test("render default view")
	render_view_1() {
		const wrapper = shallow(<Search />);
		expect(wrapper.find('View')).to.have.length(2);
		expect(wrapper.find('ListSearch')).to.have.length(1);
		expect(wrapper.find('ScrollView')).to.have.length(1);
	}

	@test("render search item")
	render_view_2() {
		const users = {
         data: 
	   [ { createdOn: '2017-05-08T21:12:17.804Z',
	       modifiedOn: '2017-05-08T21:12:17.804Z',
	       accountId: 105990045,
	       name: 'Peter',
	       userId: 'peterw@dev6.com',
	       email: 'peterw@dev6.com',
	      },
	     { createdOn: '2017-05-08T20:28:22.484Z',
	       modifiedOn: '2017-05-08T20:28:22.484Z',
	       accountId: 105990045,
	       name: 'Shu',
	       userId: 'szhangsyr@gmail.com',
	       email: 'szhangsyr@gmail.com',
	       role: 'USER',
	     }]
      };

		const wrapper = shallow(<Search users={users} />);
		wrapper.setState({searchTerm: 'S'});
		expect(wrapper.find('View')).to.have.length(1);
		expect(wrapper.find('ListSearch')).to.have.length(1);
		expect(wrapper.find('ScrollView')).to.have.length(1);
	}

	
}