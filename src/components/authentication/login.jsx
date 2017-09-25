import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../logo';
import Message from '../message';
import LineWithText from './line-with-text';
import Footer from './footer';
import { APIUrl } from '../../App';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    let isLoggedIn = false;
    let message = null;
    if (localStorage.getItem('token') != null) {
      isLoggedIn = true;
    }
    if (this.props.location.data != null) {
      message = this.props.location.data.message;
    }
    this.state = {
      message,
      isLoggedIn,
      username: '',
      password: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  submitUserCredentials = (event) => {
    event.preventDefault();
    this.loginUser();
  }

  loginUser = () => {
    this.setState({
      message: 'Trying to login...',
    });
    fetch(`${APIUrl}auth/login`, {
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
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', this.state.username);
          this.setState({
            isLoggedIn: true,
            message: '',
            password: '',
          });
        }
      });
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-2">
        <Logo />
        <div className="card p-4 no-border-corners">
          <p className="text-center grey-text">Record and track your goals </p>
          <div className="card-block">
            <LineWithText lineText="LOGIN" />
            {this.state.message != null &&
              <Message
                message={this.state.message}
              />
            }
            <form onSubmit={this.submitUserCredentials}>
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
                className="form-control mb-2"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
                placeholder="Password"
                required
              />
              <button
                className="btn btn-cool-blue btn-sm col-md-12"
                type="submit"
              >Submit
              </button>
            </form>
            <p className="grey-text text-center mt-4 message">
              Resolve password issues
              <Link to="/reset-password" className="card-link"> here</Link>
            </p>
          </div>
        </div>
        <Footer message="Don't have an account? " link="/registration" linkText="Register" />
      </div>
    );
  }
}
