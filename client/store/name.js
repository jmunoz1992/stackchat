import axios from 'axios';
import socket from '../socket';

const GOT_NAME = 'GOT_NAME';

export const gotName = function (name) {
    return {
      type: GOT_NAME,
      name
    };
  };

    // action reducer
    export default function reducer(state = '', action) {
        switch (action.type) {
          case GOT_NAME:
            return { ...state, name: action.name };
          default:
             return state;
        }
      }

