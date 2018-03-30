import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeChannel } from '../store';

function NewChannelEntry (props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input className="form-control" type="text" name="channelName" placeholder="Enter channel name" value={props.newChannelEntry} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

/** Write your `connect` component below! **/

const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleChange(event) {
      dispatch(writeChannel(event.target.value));
    }
  };
}

const NewChannelEntryContainer = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);

export default NewChannelEntryContainer;
