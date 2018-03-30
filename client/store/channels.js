import axios from 'axios';
import socket from '../socket';

const GET_CHANNELS = 'GET_CHANNELS';

const GOT_NEW_CHANNEL_FROM_SERVER = 'GOT_NEW_CHANNEL_FROM_SERVER';

// action creator
export  const gotChannel = function (inputChannels) {
    return {
      type: GET_CHANNELS,
      channels: inputChannels
    };
  };
  
  // action creator
  export  const gotNewChannelFromServer = function (channel) {
    return {
      type: GOT_NEW_CHANNEL_FROM_SERVER,
      channel
    };
  };

  export   function fetchChannels() {
    // THUNK
    return function thunk(dispatch) {
      axios.get('/api/channels')
      .then(res => res.data)
      .then(channels => {
        dispatch(gotChannel(channels));
      });
    };
  }

  export  function postChannel (channelData, ownProps) {
    return function thunk (dispatch) {
      return axios.post('/api/channels', channelData)
        .then(res => res.data)
        .then(newChannel => {
          const action = gotNewChannelFromServer(newChannel);
          dispatch(action);
          socket.emit('new-channel', newChannel);
          // console.log('string of props',ownProps, 'newchannel' ,newChannel);
          ownProps.history.push(`/channels/${newChannel.id}`);
        });
    };
  }

  // action reducer
  export default function reducer(state = [], action) {
    switch (action.type) {
      case GET_CHANNELS:
        return  action.channels;
      case GOT_NEW_CHANNEL_FROM_SERVER:
        return [ ...state, action.channel ] ;
      default:
         return state;
    }
  }