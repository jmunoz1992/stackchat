import axios from 'axios';
import socket from '../socket';

//action types

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

//action creators

export const gotMessagesFromServer = function (messages) {
    return {
      type: GOT_MESSAGES_FROM_SERVER,
      messages: messages
    };
  };
  
  // action creator
  export  const gotNewMessageFromServer = function (message) {
    return {
      type: GOT_NEW_MESSAGE_FROM_SERVER,
      message
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

  // action reducer
  export default function reducer(state = [], action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER:
        return action.messages;
      case GOT_NEW_MESSAGE_FROM_SERVER:
        return [ ...state, action.message ];
      default:
         return state;
    }
  }