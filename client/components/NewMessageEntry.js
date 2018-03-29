import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store, { gotMessagesFromServer, writeMessage, gotNewMessageFromServer, postMessage } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
      this.unsubscribe();

  }

  handleChange(event) {
    store.dispatch(writeMessage(event.target.value));
  }

  handleSubmit(event) {
    console.log('this state', this.state);
    event.preventDefault();
    store.dispatch(postMessage([this.state.newMessageEntry, this.props.channelId, this.state.name]));
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
