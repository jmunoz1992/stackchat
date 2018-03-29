import React, { Component } from 'react';
import store, { writeMessage, postMessage } from '../store';

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
    event.preventDefault();
    const content = this.state.newMessageEntry;
    const name = this.state.name;
    const channelId = this.props.channelId;
    const messageData = {content, channelId, name};
    const postMessageThunk = postMessage(messageData);
    store.dispatch(postMessageThunk);
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
