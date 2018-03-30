import axios from 'axios';
import socket from '../socket';

const WRITE_CHANNEL = 'WRITE_CHANNEL';

export const writeChannel = function (inputChannel) {
    return {
      type: WRITE_CHANNEL,
      newChannelEntry: inputChannel
    };
  };

  // action reducer
  export default function reducer(state = '', action) {
    switch (action.type) {
      case WRITE_CHANNEL:
        return { ...state, newChannelEntry: action.newChannelEntry };
      default:
         return state;
    }
  }