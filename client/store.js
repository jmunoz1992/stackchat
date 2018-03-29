import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';


// action type
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

const WRITE_MESSAGE = 'WRITE_MESSAGE';

const GOT_NAME = 'GOT_NAME';



// action creator
export const gotName = function (name) {
  return {
    type: GOT_NAME,
    name: name
  };
};

export const gotMessagesFromServer = function (messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  };
};

// action creator
export const gotNewMessageFromServer = function (message) {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  };
};

// action creator
export const writeMessage = function (inputContent) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  };
};

export function fetchMessages() {
  return function thunk(dispatch) {
    return axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      dispatch(gotMessagesFromServer(messages));
    });
  }
}

export function postMessage (message) {
  return function thunk (dispatch) {
    return axios.post('/api/messages', {
      content: message[0],
      channelId: message[1]
    })
      .then(res => res.data)
      .then(newMessage => {
        //console.log('Made it!!')
        const action = gotNewMessageFromServer(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  }
}

// initial state
const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
};

// action reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
       return Object.assign({}, state, { messages: action.messages });
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [ ...state.messages, action.message ] };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    default:
       return state;
  }
}

// store
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));

export default store;

