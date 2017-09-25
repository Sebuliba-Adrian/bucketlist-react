import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './line-with-text';
import Footer from './footer';
import { APIUrl } from '../../App';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  getDefaultState = () => ({
    registered: false,
    message: null,
    name: '',
    username: '',
    password: '',
    password_rpt: '',
  })

  submitUserDetails = (event) => {
    event.preventDefault();
    this.registerUser();
  }

  registerUser = () => {
    this.setState({
      message: 'Trying to register...',
    });
    fetch(`${APIUrl}auth/register`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(this.state),
    }).then(result => result.json())
      .then((data) => {
        if (data.status === 'Error') {
          this.setState({
            message: data.message,
          });
        } else {
          this.setState({
            registered: true,
            message: 'Account created. Please login to proceed.',
          });
        }
      });
  }
  render() {
    if (this.state.registered) {
      return <Redirect to={{ pathname: '/login', data: { message: this.state.message } }} />;
    }
    return (
      <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2">
        <Logo />
        <div className="card p-4 no-border-corners">
          <p className="text-center grey-text">Record and track your goals </p>
          <div className="card-block">
            <LineWithText lineText="REGISTER" />
            {this.state.message != null &&
              <Message
                message={this.state.message}
              />
            }
            <form onSubmit={this.submitUserDetails}>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Full name"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
                required
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
                required
              />
              <input
                type="password"
                className="form-control mb-1"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
                required
              />
              <input
                className="form-control mb-2"
                type="password"
                name="password_rpt"
                placeholder="Repeat password"
                value={this.state.password_rpt}
                onChange={this.onInputChange}
                required
              />
              <button
                className="btn btn-cool-blue btn-sm col-md-12"
                type="submit"
              >Submit
              </button>
            </form>
            <p
              className="grey-text text-center mt-4 message"
            >
              <p>By signing up, you agree to our<br />
                <b>Terms & Privacy Policy</b>
              </p>
            </p>
          </div>
        </div>
        <Footer message="Have an account? " link="/login" linkText="Log in" />
      </div>);
  }
}
