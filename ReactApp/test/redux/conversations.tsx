import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import conversations, {loadConvs, createConv, loadMsgs, createMsg, loadAttachment, sendAttachment} from '../../redux/conversations';

@suite("reducer conversations")
class ConversationsTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        error: null,
      };
      let state = conversations();
      expect(state).to.eql(initialState);
    }
    
    @test("state: REQUEST")
    state_2() {
      const state = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      let newState = conversations(state, {type:'REQUEST_CONVERSATIONS'});
      expect(newState).to.eql({
        ...state,
        loading: true
      });
    }

    @test("state: CREATE_CONV_SUCCESS")
    state_3() {
      const state = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'CREATE_SUCCESS_CONVERSATIONS',
        payload: {},
        error: 'no error'
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        data: state.data.concat([action.payload]),
        loading: false,
        error: action.error
      });
    }

    @test("state: READ_CONVS_SUCCESS")
    state_4() {
      const state = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'SUCCESS_CONVERSATIONS',
        payload: {},
        error: null
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        data: action.payload,
        loading: false,
        error: action.error
      });
    }

    @test("state: CREATE_MSG_SUCCESS")
    state_5() {
      const state = {
        messages: {
          "123": [{
            "body": {"message": "helloworld"},
            "conversationId": "123"
          }]
        },
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'CREATE_SUCCESS_MESSAGES',
        payload: {
          body: JSON.stringify({"message": "testing123"}),
          conversationId: '123'
        },
        error: null
      };
      const messages =  {
        "123": [{
          "body": {"message": "testing123"},
          "conversationId": "123"
        },
        {
          "body": {"message": "helloworld"},
          "conversationId": "123"
        }]
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        messages: messages,
        loading: false,
        error: action.error
      });
    }

    @test("state: READ_MSGS_SUCCESS")
    state_6() {
      const state = {
        messages: {
           "123": [{
            "body": {"message": "helloworld"},
            "conversationId": "123"
          }]
        },
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'SUCCESS_MESSAGES',
        payload: [{
          body: JSON.stringify({"message": "testing123"}),
          conversationId: '123'
        }],
        error: null
      };
      const freshMessages = {
        "123": [{
          "body": {"message": "testing123"},
          "conversationId": "123"
        }],
        "earlierMessages": false
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        messages: freshMessages,
        loading: false,
        error: action.error
      });
    }

    @test("state: READ_MSGS_SUCCESS empty payload")
    state_6_2() {
      const state = {
        messages: {
           "123": [{
            "body": {"message": "helloworld"},
            "conversationId": "123"
          }]
        },
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'SUCCESS_MESSAGES',
        payload: [],
        error: null
      };
      const freshMessages = {
        "123": [{
          "body": {"message": "helloworld"},
          "conversationId": "123"
        }]
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        messages: freshMessages,
        loading: false,
        error: action.error
      });
    }

    @test("state: SINGLE_ATTACH_SUCCESS")
    state_7() {
      const state = {
        messages: {
           "123": [{
            "body": {"message": "helloworld"},
            "conversationId": "123"
          }]
        },
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'SINGLE_ATTACH_SUCCESS',
        payload: {
          body: JSON.stringify({"message": "testing123"}),
          conversationId: '123'
        },
        error: null
      };
      const newMsg = {
        "123": [{
          "body": {"message": "helloworld"},
          "conversationId": "123"
        }]
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        messages: newMsg,
        loading: false,
        error: action.error
      });
    }

    @test("state: READ_ATTACHMENTS_SUCCESS")
    state_8() {
      const state = {
        messages: {
          "123": [{
            "body": {"message": "helloworld"},
            "conversationId": "123"
          }]
        },
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'SUCCESS_ATTACHMENTS',
        payload: [{
          body: JSON.stringify({"message": "testing123"}),
          conversationId: '123'
        }],
        error: null
      };
      const combinedMessages = {
        "123": [{
          "body": "{\"message\":\"testing123\"}",
          "conversationId": "123"
        }],
        "earlierMessages": false
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        messages: combinedMessages,
        loading: false,
        error: action.error
      });
    }

    @test("state: UPLOADING")
    state_9() {
      const state = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'UPLOADING',
        payload: {},
        error: 'no error'
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        loading: true
      });
    }

    @test("state: FAILURE")
    state_10() {
      const state = {
        messages: {},
        attachments: {},
        data: [],
        loading: false,
        subscription: '',
        error: null,
      };
      const action = {
        type:'FAILURE_CONVERSATIONS',
        payload: {},
        error: '1 error found'
      };
      let newState = conversations(state, action);
      expect(newState).to.eql({
        ...state,
        loading: false,
        error: action.error
      });
    }

    @test("loadConvs")
    test_loadConvs() {
      let fn = loadConvs();
    }

    @test("createConv")
    test_createConv() {
      const convo = {};
      let fn = createConv(convo);
    }

    @test("loadMsgs")
    test_loadMsgs() {
      const convoId = 123;
      let fn = loadMsgs(convoId);
    }

    @test("createMsg")
    test_createMsg() {
      const convoId = 123;
      const msg = '';
      let fn = createMsg(convoId, msg);
    }

   /* @test("loadAttachment")
    test_loadAttachment() {
      const convoId = 123;
      const attachId = 456;
      let fn = loadAttachment(convoId, attachId);
    }*/

    @test("sendAttachment")
    test_sendAttachment() {
      const convoId = 123;
      const attachment = {
        "type": "string",
        "name": "string",
        "content": '<binary-blob>'
      };
      let fn = sendAttachment(convoId, attachment);
    }

}