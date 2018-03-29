import React, { Component } from 'react';
import store, { postMessage, gotName } from '../store';

export default class NameEntry extends Component {
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
    store.dispatch(gotName(event.target.value));
  }

  handleSubmit(event) {
    console.log('this state', this.state);
    event.preventDefault();
    store.dispatch(postMessage([this.state.newMessageEntry, 1, this.state.name]));
  }

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
