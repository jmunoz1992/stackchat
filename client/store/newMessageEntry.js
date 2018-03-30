import axios from 'axios';
import socket from '../socket';

const WRITE_MESSAGE = 'WRITE_MESSAGE';

export const writeMessage = function (inputContent) {
    return {
      type: WRITE_MESSAGE,
      newMessageEntry: inputContent
    };
  };

  export default function reducer(state = '', action) {
    switch (action.type) {
      case WRITE_MESSAGE:
        return { ...state, newMessageEntry: action.newMessageEntry };
      default:
         return state;
    }
  }