import React from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { CreateConversation } from '../../screens/CreateConversation';
import MiTextInput from '../../components/MiTextInput';

@suite("<CreateConversation />")
class CreateConversationTest {
	  navigator = [];

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
      const wrapper = shallow(<CreateConversation navigator={this.navigator} users={this.users} />);

      expect(wrapper.find('View')).to.have.length(3);
      expect(wrapper.find('Image')).to.have.length(2);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }


}
