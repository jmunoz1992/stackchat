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

const GET_CHANNELS = 'GET_CHANNELS';

const GOT_NEW_CHANNEL_FROM_SERVER = 'GOT_NEW_CHANNEL_FROM_SERVER';

const WRITE_CHANNEL = 'WRITE_CHANNEL';

// action creator
export const gotName = function (name) {
  return {
    type: GOT_NAME,
    name
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
    message
  };
};

// action creator
export const writeMessage = function (inputContent) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  };
};

// action creator
export const gotChannel = function (inputChannels) {
  return {
    type: GET_CHANNELS,
    channels: inputChannels
  };
};

// action creator
export const writeChannel = function (inputChannel) {
  return {
    type: WRITE_CHANNEL,
    newChannelEntry: inputChannel
  };
};

// action creator
export const gotNewChannelFromServer = function (channel) {
  return {
    type: GOT_NEW_CHANNEL_FROM_SERVER,
    channel
  };
};

// THUNK CREATOR
export function fetchMessages() {
  // THUNK
  return function thunk(dispatch) {
    return axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      dispatch(gotMessagesFromServer(messages));
    });
  };
}

// THUNK CREATOR
export function fetchChannels() {
  // THUNK
  return function thunk(dispatch) {
    axios.get('/api/channels')
    .then(res => res.data)
    .then(channels => {
      dispatch(gotChannel(channels));
    });
  };
}

export function postMessage (messageData) {
  return function thunk (dispatch) {
    return axios.post('/api/messages', messageData)
      .then(res => res.data)
      .then(newMessage => {
        const action = gotNewMessageFromServer(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  };
}

export function postChannel (channelData) {
  return function thunk (dispatch) {
    return axios.post('/api/channels', channelData)
      .then(res => res.data)
      .then(newChannel => {
        const action = gotNewChannelFromServer(newChannel);
        dispatch(action);
        socket.emit('new-channel', newChannel);
      });
  };
}

// initial state
const initialState = {
  messages: [],
  newMessageEntry: '',
  name: '',
  channels: [],
  newChannelEntry: '',
};

// action reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages};
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [ ...state.messages, action.message ] };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NAME:
      return { ...state, name: action.name };
    case GET_CHANNELS:
      return { ...state, channels: action.channels  };
    case GOT_NEW_CHANNEL_FROM_SERVER:
      return { ...state, channels: [ ...state.channels, action.channel ] };
    case WRITE_CHANNEL:
      return { ...state, newChannelEntry: action.newChannelEntry };
    default:
       return state;
  }
}

// store
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));

export default store;

