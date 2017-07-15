import React from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { ConversationsList } from '../../screens/ConversationsList';

@suite("<ConversationsList />")
class ConversationsListTest {

		conversations = {
			data: [ { visibility: 'PUBLIC',
	       languageCode: 'en-US',
	       createdOn: '2017-05-09T21:04:58.082Z',
	       modifiedOn: '2017-05-09T21:04:58.082Z',
	       conversationId: '1cee757b-2bd7-494e-a13f-7fd1336abe95',
	       accountId: '105990045',
	       name: '6:30 AM Demo',
	       createdBy: 'martin.gillen@mitel.com',
	       modifiedBy: 'martin.gillen@mitel.com',
	       stream: true,
	       accessCode: '276917',
	       email: 'conversations+1cee757b-2bd7-494e-a13f-7fd1336abe95+105990045@mitel-api.com',
	       thumbnailUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
	       _links: { self: '/api/2016-12-31/conversations/1cee757b-2bd7-494e-a13f-7fd1336abe95' },
	       _embedded: 
	        { messages: 
	           { count: 1,
	             _links: 
	              { self: '/api/2016-12-31/conversations/1cee757b-2bd7-494e-a13f-7fd1336abe95/messages',
	                next: '/api/2016-12-31/conversations/1cee757b-2bd7-494e-a13f-7fd1336abe95/messages?$skip=1&$top=1&$filter=conversationId eq \'1cee757b-2bd7-494e-a13f-7fd1336abe95\'' },
	             _embedded: 
	              { items: 
	                 [ { messageId: '933571ae-24a2-4383-a5bf-30e0c35acb01',
	                     contentType: 'text/html',
	                     createdOn: '2017-05-10T01:32:50.713Z',
	                     conversationId: '1cee757b-2bd7-494e-a13f-7fd1336abe95',
	                     accountId: '105990045',
	                     body: 'https://s3.amazonaws.com/platform-api-conversations/105990045/1cee757b-2bd7-494e-a13f-7fd1336abe95/SAS Architecture (3).png',
	                     createdBy: 'martin.gillen@mitel.com' } ] } },
	          participants: 
	           { count: 2,
	             _links: { self: '/api/2016-12-31/conversations/1cee757b-2bd7-494e-a13f-7fd1336abe95/participants' },
	             _embedded: 
	              { items: 
	                 [ { userId: 'martin.gillen@mitel.com',
	                     accountId: '105990045',
	                     status: 'ACCEPTED',
	                     conversationId: '1cee757b-2bd7-494e-a13f-7fd1336abe95' },
	                   { userId: 'cherie.dizon@mitel.com',
	                     accountId: '105990045',
	                     status: 'INVITED',
	                     conversationId: '1cee757b-2bd7-494e-a13f-7fd1336abe95' } ] } } } },

				{ visibility: 'PUBLIC',
	       languageCode: 'en-US',
	       createdOn: '2017-05-09T20:38:06.602Z',
	       modifiedOn: '2017-05-09T20:38:06.602Z',
	       conversationId: '74b28724-44cd-4546-8549-532e93089215',
	       accountId: '105990045',
	       name: '6:00 AM Demo',
	       createdBy: 'martin.gillen@mitel.com',
	       modifiedBy: 'martin.gillen@mitel.com',
	       stream: true,
	       accessCode: '554245',
	       email: 'conversations+74b28724-44cd-4546-8549-532e93089215+105990045@mitel-api.com',
	       thumbnailUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
	       _links: { self: '/api/2016-12-31/conversations/74b28724-44cd-4546-8549-532e93089215' },
	       _embedded: 
	        { messages: 
	           { count: 1,
	             _links: 
	              { self: '/api/2016-12-31/conversations/74b28724-44cd-4546-8549-532e93089215/messages',
	                next: '/api/2016-12-31/conversations/74b28724-44cd-4546-8549-532e93089215/messages?$skip=1&$top=1&$filter=conversationId eq \'74b28724-44cd-4546-8549-532e93089215\'' },
	             _embedded: 
	              { items: 
	                 [ { messageId: '88e818be-c1ea-443f-b055-83767bb8db8b',
	                     contentType: 'text/html',
	                     createdOn: '2017-05-09T20:39:18.662Z',
	                     conversationId: '74b28724-44cd-4546-8549-532e93089215',
	                     accountId: '105990045',
	                     body: 'https://s3.amazonaws.com/platform-api-conversations/105990045/74b28724-44cd-4546-8549-532e93089215/dr13Z_s-200x150.gif',
	                     createdBy: 'cherie.dizon@mitel.com' } ] } },
	          participants: 
	           { count: 2,
	             _links: { self: '/api/2016-12-31/conversations/74b28724-44cd-4546-8549-532e93089215/participants' },
	             _embedded: 
	              { items: 
	                 [ { userId: 'martin.gillen@mitel.com',
	                     accountId: '105990045',
	                     status: 'ACCEPTED',
	                     conversationId: '74b28724-44cd-4546-8549-532e93089215' },
	                   { userId: 'cherie.dizon@mitel.com',
	                     accountId: '105990045',
	                     status: 'INVITED',
	                     conversationId: '74b28724-44cd-4546-8549-532e93089215' } ] } } } }
				],
			loading: false,
			error: undefined 
		};

    @test("render default view")
    render_view_1() {
      const wrapper = shallow(<ConversationsList conversations={this.conversations} />);

      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(0);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('MiText')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('ModalDropdown')).to.have.length(0);
			expect(wrapper.find('ScrollView')).to.have.length(1);
			expect(wrapper.find('ListSearch')).to.have.length(1);
			expect(wrapper.find('ListRow')).to.have.length(2);
    }

		@test("call function adjustFrame")
    test_adjustFrame() {
      let conversationsList = new ConversationsList();
      let style = {
        right: 0
      };
      conversationsList.adjustFrame(style);
      expect(style.right).to.equal(1);
    }

    @test("call function onSelect")
    test_onSelect() {
      let conversationsList = new ConversationsList();
      conversationsList.onSelect(1, 2);
    }

    @test("call function onDropdownWillShow")
    test_onDropdownWillShow() {
      let conversationsList = new ConversationsList();
      conversationsList.onDropdownWillShow();
    }

    @test("call function onDropdownWillHide")
    test_onDropdownWillHide() {
      let conversationsList = new ConversationsList();
      conversationsList.onDropdownWillHide();
    }
}