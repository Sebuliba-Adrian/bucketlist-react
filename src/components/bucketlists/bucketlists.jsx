import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../navbar';
import { APIUrl } from '../../App';
import Message from '../message';
import BucketlistModal from './bucketlist-modal';
import Bucketlist from './bucketlist';

export default class Bucketlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      bucketlists: null,
      message: null,
    };
    if (this.state.token !== null) {
      this.bucketlistTransaction('getBucketlists', 'bucketlists', 'GET');
    }
  }

  logoutUser = () => {
    this.bucketlistTransaction('logoutUser', 'logout', 'GET');
  }

  bucketlistTransaction = (action, urlEndPoint, requestMethod, requestBody) => {
    this.setState({
      message: 'Processing...',
    });
    fetch(`${APIUrl}${urlEndPoint}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.state.token,
      },
      method: requestMethod,
      body: requestMethod === 'POST' || requestMethod === 'PUT' ? JSON.stringify(requestBody) : undefined,
    }).then(result => result.json())
      .then((data) => {
        if (data.status === 'Error') {
          if (data.message.indexOf('expired') > -1) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.setState({
              token: '',
              message: 'Your token has expired! Login again to continue.',
            });
          } else {
            this.setState({
              message: data.message,
            });
          }
        } else if (action === 'getBucketlists') {
          if (data.bucketlists) {
            this.setState({
              message: null,
              bucketlists: data.bucketlists,
            });
          } else {
            this.setState({
              message: "You don't have any bucketlists. Use the above button to add some.",
              bucketlists: [],
            });
          }
        } else if (action === 'addBucketlist') {
          const updateBucketlists = this.state.bucketlists.slice();
          updateBucketlists.push(data.bucketlist);
          this.setState({
            bucketlists: updateBucketlists,
            message: 'Bucketlist successfully added.',
          });
        } else if (action === 'updateBucketlist') {
          const bucketlistsCopy = this.state.bucketlists.slice();
          const updatedBucketlists = bucketlistsCopy.filter(bucketlist => (
            bucketlist.id !== requestBody.id
          ));
          updatedBucketlists.push(data.bucketlist);
          this.setState({
            message: 'Bucketlist successfully updated.',
            bucketlists: updatedBucketlists,
          });
        } else if (action === 'deleteBucketlist') {
          const bucketlistsCopy = this.state.bucketlists.slice();
          const updatedBucketlists = bucketlistsCopy.filter(bucketlist => (
            bucketlist.id !== parseInt(urlEndPoint.substring(urlEndPoint.lastIndexOf('/') + 1), 10)
          ));
          this.setState({
            message: 'Bucketlist successfully deleted.',
            bucketlists: updatedBucketlists,
          });
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.setState({
            message: 'You have successfully logged out.',
          });
        }
      });
  }

  render() {
    if (!this.state.token) {
      return <Redirect to={{ pathname: '/login', data: { message: this.state.message } }} />;
    }
    return (
      <div>
        <div className="custom-navbar">
          <NavBar logoutUser={this.logoutUser} />
        </div>
        <div className="container">
          <div className="card mt-3 mb-3">
            <div className="card-block">
              <div className="d-flex w-100 justify-content-between mb-2">
                <p />
                <button
                  className="btn btn-sm btn-primary col-xs-12"
                  data-toggle="modal"
                  data-target="#addBucketlistModal"
                ><span className="fa fa-plus pull-left" /> Add bucketlist
                </button>
              </div>
              {
                this.state != null && this.state.message &&
                  <Message
                    message={this.state.message}
                  />
              }
              {
                this.state && this.state.bucketlists && this.state.bucketlists.length !== 0 &&
                  <div>
                    <h6 className="card-text ml-4 pb-2">
                        Bucketlists <small className="text-muted">select to view details</small>
                    </h6>
                    <ul className="list-group list-group-flush">
                      {
                        this.state.bucketlists.map(bucketlist =>
                          (<Bucketlist
                            key={bucketlist.id}
                            bucketlist={bucketlist}
                            setActiveBucket={this.setActiveBucket}
                            bucketlistTransaction={this.bucketlistTransaction}
                          />
                          ),
                        )
                      }
                    </ul>
                  </div>
              }
            </div>
          </div>
        </div>
        <BucketlistModal
          title="Create a bucket"
          action="Submit"
          theId="addBucketlistModal"
          bucketlistTransaction={this.bucketlistTransaction}
        />
      </div>
    );
  }
}
