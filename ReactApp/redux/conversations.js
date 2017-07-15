'use strict';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
require('./react-native-paho');

import { conversations } from './cloudlink';

// use row notifications due to issue with build-in
let notify = conversations.notifications();
let messageSubscription = null;

// Set initial state
const initialState = {
  messages: {},
  attachments: {},
  data: [],
  loading: false,
  subscription: '',
  error: null,
}

const CREATE_CONV_SUCCESS = 'CREATE_SUCCESS_CONVERSATIONS';
const READ_CONVS_SUCCESS = 'SUCCESS_CONVERSATIONS';

const CREATE_MSG_SUCCESS = 'CREATE_SUCCESS_MESSAGES';
const READ_MSGS_SUCCESS = 'SUCCESS_MESSAGES';
const RECEIVE_MSG_SUCCESS = 'RECEIVE_SUCCESS_MESSAGES';

const CREATE_ATTACHMENT_SUCCESS = 'CREATE_ATTACHMENT_SUCCESS';
const READ_ATTACHMENTS_SUCCESS = 'SUCCESS_ATTACHMENTS';
const SINGLE_ATTACH_SUCCESS = 'SINGLE_ATTACH_SUCCESS';

const SUBSCRIBE_SUCCESS = 'SUCCESS_SUBSCRIBED';
const UNSUBSCRIBE_SUCCESS = 'SUCCESS_UNSUBSCRIBED';

const REQUEST = 'REQUEST_CONVERSATIONS';
const SEND_REQUEST = 'SEND_REQUEST_CONVERSATION';
const UPLOADING = 'UPLOADING';
const FAILURE = 'FAILURE_CONVERSATIONS';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_REQUEST:
      return {
          ...state,
        request: action.request,  
        loading: true
      }
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_CONV_SUCCESS:
      return {
        ...state,
        data: state.data.concat([action.payload]),
        loading: false,
        error: action.error
      }
    case READ_CONVS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: action.error
      }
    case CREATE_MSG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case READ_MSGS_SUCCESS:
        if (action.payload.length < 1) {
            return state;
        }

        const freshMessages = {
            ...state.messages,
            earlierMessages: action.payload.length > 9 ? true : false
        }

        freshMessages[action.payload[0].conversationId] = action.payload.map(msg => {
            if (msg.body && IsJsonString(msg.body)) {
                msg.body = JSON.parse(msg.body);
            } else {
                msg.body = {text: msg.body}
            }
            return msg;
        });

      return {
        ...state,
        messages: freshMessages,
        loading: false,
        error: action.error
      }
    case RECEIVE_MSG_SUCCESS:
        action.payload.body = {text: action.payload.body};
        let messages = {};

        if (!state.messages[action.payload.conversationId]) {
            messages = {
                ...state.messages,
                [action.payload.conversationId]: [action.payload]
            }
        } else {
            messages = {
                ...state.messages,
                [action.payload.conversationId]: [action.payload].concat(state.messages[action.payload.conversationId])
            }
        }
    
      return {
        ...state,
        messages: messages,
        loading: false,
        error: action.error
      }
    case SUBSCRIBE_SUCCESS:
      return {
          ...state,
          subscription: action.payload
      }
    case UNSUBSCRIBE_SUCCESS:
      return {
          ...state,
          subscription: action.payload
      }
    case SINGLE_ATTACH_SUCCESS:
        const newConvo = state.messages[action.payload.conversationId].map(msg => {
            if (msg.body && msg.body.attachment && !msg.body.image && msg.body.attachment.name === action.payload.name) {
                msg.body.image = action.payload.image;
            }
            return msg;
        })
        const newMsg = {
            ...state.messages,
            [action.payload.conversationId]: newConvo
        }

        return {
            ...state,
            messages: newMsg,
            loading: false,
            error: action.error
        }
    case READ_ATTACHMENTS_SUCCESS:
        if (action.payload.length < 1) {
            return state;
        }

        const combinedMessages = {
            ...state.messages,
            [action.payload[0].conversationId]: action.payload,
            earlierMessages: action.payload.length > 9 ? true : false
        }
      return {
        ...state,
        messages: combinedMessages,
        loading: false,
        error: action.error
      }
    case UPLOADING:
      return {
        ...state,
        loading: true
      }
    case FAILURE:
        console.log("FAILURE HERE " + action.func + " " + action.error);
      return {
        ...state,
        loading: false,
        subscription: '',
        error: action.error
      }
    default:
      return state
  }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getOptions(authToken) {
    return {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
    }
}

function postOptions(body, authToken) {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
}

function putOptions(body, authToken) {
    return {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
}

function putFileOptions(type, body, authToken) {
    return {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': type,
        },
        body: body
    }
}

export function loadConvs() {
    return dispatch => {
        conversations.getConversations({filter: 'stream eq false'})
            .then(response => {
                if (typeof response.conversations === 'undefined') {
                    response.conversations = [];
                }
                console.log(`Conversations found:`, response.conversations);
                dispatch({ type: READ_CONVS_SUCCESS, payload: response.conversations });
            }).catch(err => {
                if (err.status) {
                    console.warn(`Get messages failed with status:[${err.status}] message:[${err.statusText}]`);
                    dispatch({ type: FAILURE, error: err.statusText })
                } else {
                    console.warn(`Unknown error occurred:[${err.toString()}]`);
                    dispatch({ type: FAILURE, error: err })
                }
            });
    }
}

export function createConv(convo) {
    return (dispatch, getState) => {
        const {auth} = getState();
        const config = {
            path: CONVERSATIONS_URL,
            method: "POST",
            headers: {},
            body: convo,
            isFromConversations: true,
            success: data => {
                convo.participants.forEach((p, i) => {
                    fetch(CONVERSATIONS_URL + '/' + data.conversationId +'/participants', postOptions(p, auth.data.accessToken)).then(el => {
                        if (i === convo.participants.length - 1) {
                            fetch(CONVERSATIONS_URL +'/'+ data.conversationId, getOptions(auth.data.accessToken))
                            .then(resp => resp.json())
                            .then(
                                conv => dispatch({ type: CREATE_CONV_SUCCESS, payload: conv }),
                                error => dispatch({ type: FAILURE, error: error.name || error.message })
                            )
                        }
                    })
                })
            },
            failure: error => dispatch({ type: FAILURE, error: error.name || error.message }),
        }
        dispatch({ type: SEND_REQUEST, request: 'CREATING CONVERSATION' });
        dispatch({ type: REQUEST, fetchConfig: config });
    }
}

export function loadMsgs(convId) {
    return dispatch => {
        dispatch({ type: SEND_REQUEST, request: 'LOADING MESSAGES'});
        conversations.getMessages({conversationId: convId})
            .then(response => {
                if (typeof response.messages === 'undefined') {
                    response.messages = [];
                }
                console.log('Messages found:', response.messages);
                dispatch({ type: READ_MSGS_SUCCESS, payload: response.messages });
            }).catch(err => {
                if (err.status) {
                    console.warn(`Get messages failed with status:[${err.status}] message:[${err.statusText}]`);
                    dispatch({ type: FAILURE, error: err.statusText })
                } else {
                    console.warn(`Unknown error occurred:[${err.toString()}]`);
                    dispatch({ type: FAILURE, error: err })
                }
            });
    }

}

export function createMsg(convoId, msg) {
    return dispatch => {
        dispatch({ type: SEND_REQUEST, request: 'CREATING MESSAGE' });
        conversations.createMessage({conversationId: convoId, body: msg.text})
            .then(response => {
                console.log('Message created:', response);
                dispatch({ type: CREATE_MSG_SUCCESS, payload: response});
            }).catch(err => {
                if (err.status) {
                    console.warn(`Create message failed with status:[${err.status}] message:[${err.statusText}]`);
                    dispatch({ type: FAILURE, error: err.statusText })
                } else {
                    console.warn(`Uknown error occurred:[${err.toString()}]`);
                    dispatch({ type: FAILURE, error: err })
                }
            });
    }

}

export function loadAttachment(convoId, attachId) {
    const attachURL = CONVERSATIONS_URL +'/'+ convoId + '/attachments/' + attachId;
    return (dispatch, getState) => {
        const {auth} = getState();
        const contentPromise = fetch(attachURL+'/content', getOptions(auth.data.accessToken));
        const config = {
            path: attachURL,
            method: "GET",
            headers: {},
            isFromConversations: true,
            success: attachMeta => {
                contentPromise
                    .then(resp => resp.json())
                    .then(resp => { return { ...attachMeta, image: resp } })
                    .then(resp => dispatch({ type: SINGLE_ATTACH_SUCCESS, payload: resp }))
            },
            failure: error => dispatch({ type: FAILURE, error: error.name || error.message }),
        }
        dispatch({ type: SEND_REQUEST, request: 'LOADING ATTACHMENT' });
        dispatch({ type: REQUEST, fetchConfig: config });
    }
}

//  BODY
// {
//   "type": "string",
//   "name": "string"
//   "content": <binary-blob>
// }
export function sendAttachment(convoId, attachment) {
    const attachURL = CONVERSATIONS_URL +'/'+ convoId + '/attachments'
    return (dispatch, getState) => {
        return new Promise(function(resolve, reject) {
            const config = {
                path: attachURL,
                method: "POST",
                headers: {},
                body: {name: attachment.name, type: attachment.type},
                isFromConversations: true,
                success: meta => {
                    const {auth} = getState();
                    const attachBody = putOptions({ uri: attachment.data }, auth.data.accessToken);
                    return fetch(attachURL + '/' + attachment.name + '/content', attachBody)
                        .then(
                            data => {
                                dispatch({ type: SINGLE_ATTACH_SUCCESS, payload: { ...meta, image: { uri: attachment.data } } })
                                resolve(attachment);
                            },
                            error => {
                                dispatch({ type: FAILURE, error: error.name || error.message })
                                reject(error);
                            }
                        )
                },
                failure: error => {
                    dispatch({ type: FAILURE, error: error.name || error.message })
                    reject(error);
                }
            }
            dispatch({ type: SEND_REQUEST, request: 'SENDING ATTACHMENT' });
            dispatch({ type: REQUEST, fetchConfig: config });
        });
    }
}

// websocket dropping issue: https://github.com/mitel-networks/platform-api-notifications/issues/59

// built-in notifications
export function subscribe(convoId) {
    return dispatch => {
        console.log('Subscribing to messages');
        messageSubscription = notify.asChangedObservable('Message')
            .subscribe(content => {
                const receivedTime = new Date().toTimeString().slice(0, 8);
                console.log(`${receivedTime} received message:  `, content.body);
                dispatch({ type: RECEIVE_MSG_SUCCESS, payload: content.body });
            });

        console.log(`Subscribing to conversation: ${convoId}`);
        notify.subscribe('websocket', convoId);
        
    }
}

export function unsubscribe(convoId) {
    return dispatch => {
        console.log(`Unsubscribing to conversation: ${convoId}`);
        notify.unsubscribe('websocket', convoId);
        if (messageSubscription) {
            console.log('Unsubscribe from message');
            messageSubscription.unsubscribe();
        }
    }
}

// raw notifications
/*export function subscribe(convoId) {
    return dispatch => {
        console.log('Subscribing to messages');
        messageSubscription = notify.asMessageObservable()
            .subscribe(message => {
                const receivedTime = new Date().toTimeString().slice(0, 8);
                console.log(`${receivedTime} received message:  `, message.content.body);
                dispatch({ type: RECEIVE_MSG_SUCCESS, payload: message.content.body });
            });

        const topic = 'platform-api-conversations';
        const subjectFilter = `/conversations/${convoId}/messages`;

        console.log(`Subscribing to events for topic:[${topic}] with filter:[${subjectFilter}]`);
        notify.subscribe('websocket', topic, subjectFilter)
            .then(subscription => {
                console.log(`Subscribed to the following:`, subscription);
                dispatch({ type: SUBSCRIBE_SUCCESS, payload: subscription.subscriptionId });
            }).catch(err => {
                if (err.status) {
                    console.warn(`Subscribe failed with status:[${err.status}] message:[${err.statusText}]`);
                    dispatch({ type: FAILURE, error: err.statusText })
                } else {
                    console.warn(`Uknown error occurred:[${err.toString()}]`);
                    dispatch({ type: FAILURE, error: err })
                }
            });
    }
}

export function unsubscribe(subId) {
    return dispatch => {
        console.log(`Unsubscribing from: ${subId}`);
        notify.unsubscribe(subId)
            .then(subscription => {
                console.log(`Unsubscribed from:`, subscription)
                if (messageSubscription) {
                    console.log('Ubsubscribe from messages');
                    messageSubscription.unsubscribe();
                }
                dispatch({ type: UNSUBSCRIBE_SUCCESS, payload: '' })
            }).catch(err => {
                if (err.status) {
                    console.warn(`Unsubscribe failed with status:[${err.status}] message:[${err.statusText}]`);
                    dispatch({ type: FAILURE, error: err.statusText })
                } else {
                    console.warn(`Uknown error occurred:[${err.toString()}]`);
                    dispatch({ type: FAILURE, error: err })
                }
            });
    }
}*/
