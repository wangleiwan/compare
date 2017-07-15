import React from 'react-native';
import ReactNativeMock from 'react-native-mock';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {Messenger} from '../../screens/Messenger';

@suite("<Messenger />")
class MessengerTest {
	data = { visibility: 'PUBLIC',
	  languageCode: 'en-US',
	  createdOn: '2017-05-11T14:43:42.334Z',
	  modifiedOn: '2017-05-11T14:43:42.334Z',
	  conversationId: 'a29c6c0f-cb6e-41c7-a91b-51e23a172518',
	  accountId: '105990045',
	  name: '10:30 AM Demo',
	  createdBy: 'cherie.dizon@mitel.com',
	  modifiedBy: 'cherie.dizon@mitel.com',
	  stream: true,
	  accessCode: '144823',
	  email: 'conversations+a29c6c0f-cb6e-41c7-a91b-51e23a172518+105990045@mitel-api.com',
	  thumbnailUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
	  _links: { self: '/api/2016-12-31/conversations/a29c6c0f-cb6e-41c7-a91b-51e23a172518' },
	  _embedded: 
	   { messages: 
	      { count: 1,
	        _links: 
	         { self: '/api/2016-12-31/conversations/a29c6c0f-cb6e-41c7-a91b-51e23a172518/messages',
	           next: '/api/2016-12-31/conversations/a29c6c0f-cb6e-41c7-a91b-51e23a172518/messages?$skip=1&$top=1&$filter=conversationId eq \'a29c6c0f-cb6e-41c7-a91b-51e23a172518\'' },
	        _embedded: 
	         { items: 
	            [ { messageId: '07bd6d46-2849-479a-8f14-61f027e523de',
	                contentType: 'text/html',
	                createdOn: '2017-05-11T14:44:16.277Z',
	                conversationId: 'a29c6c0f-cb6e-41c7-a91b-51e23a172518',
	                accountId: '105990045',
	                body: 'https://s3.amazonaws.com/platform-api-conversations/105990045/a29c6c0f-cb6e-41c7-a91b-51e23a172518/NrZqWWxItObcnRCM152n.wav',
	                createdBy: 'cherie.dizon@mitel.com' } ] } },
	     participants: 
	      { count: 2,
	        _links: { self: '/api/2016-12-31/conversations/a29c6c0f-cb6e-41c7-a91b-51e23a172518/participants' },
	        _embedded: 
	         { items: 
	            [ { userId: 'cherie.dizon@mitel.com',
	                accountId: '105990045',
	                status: 'ACCEPTED',
	                conversationId: 'a29c6c0f-cb6e-41c7-a91b-51e23a172518' },
	              { userId: 'martin.gillen@mitel.com',
	                accountId: '105990045',
	                status: 'INVITED',
	                conversationId: 'a29c6c0f-cb6e-41c7-a91b-51e23a172518' } ] } } } };

	@test("render default view")
	render_view_1() {
		const navigator = [{route: '/path'}];
		const wrapper = shallow(<Messenger navigator={navigator} />);

		expect(wrapper.find('View')).to.have.length(5);
		expect(wrapper.find('Image')).to.have.length(2);
		expect(wrapper.find('A')).to.have.length(2);
		expect(wrapper.find('GiftedChat')).to.have.length(1);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	}

	@test("render default view")
	render_view_2() {
		const navigator = [{route: '/path'}];
		const loadMsgs = (conversationId) => {};
		const wrapper = shallow(<Messenger navigator={navigator} data={this.data} loadMsgs={loadMsgs} />);

		expect(wrapper.find('View')).to.have.length(5);
		expect(wrapper.find('Image')).to.have.length(2);
		expect(wrapper.find('A')).to.have.length(2);
		expect(wrapper.find('GiftedChat')).to.have.length(1);
		expect(wrapper.find('MiTransText')).to.have.length(1);
	}

	@test("test function componentWillUnmount")
	test_componentWillUnmount() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		messenger.componentWillUnmount();
	}

	@test("test function componentWillReceiveProps")
	test_componentWillReceiveProps() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const nextProps = {
			conversations: {
				messages: [
					{
						'a29c6c0f-cb6e-41c7-a91b-51e23a172518': {},
					}
				]
			}
		};
		messenger.componentWillReceiveProps(nextProps);
	}

	@test("test function onLoadEarlier")
	test_onLoadEarlier() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		messenger.onLoadEarlier();
	}

	@test("test function formatImage")
	test_formatImage() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		let rawImage = {
			name: 'myphoto',
			data: 'data-string'
		}
		messenger.formatImage(rawImage);
	}

	@test("test function onSend")
	test_onSend() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const messages = [{}];
		messenger.onSend(messages);
	}

	@test("test function renderBubble")
	test_renderBubble() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderBubble(props);
	}

	@test("test function renderCustomActions")
	test_renderCustomActions() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderCustomActions(props);
	}

	@test("test function renderMessage")
	test_renderMessage() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderMessage(props);
	}

	@test("test function renderMessageText")
	test_renderMessageText() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderMessageText(props);
	}

	@test("test function renderMessageImage")
	test_renderMessageImage() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderMessageImage(props);
	}

	@test("test function renderFooter")
	test_renderFooter() {
	    let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderFooter(props);
	}

	@test("test function renderComposer")
	test_renderComposer() {
		let messenger = new Messenger({props: {
			data: this.data
		}});
		const props = {};
		messenger.renderComposer(props);
	}

}