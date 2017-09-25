import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './navbar';
import Message from './message';
import Bucketlists from './bucketlists/bucketlists';
import Items from './items/items';
import { APIUrl } from '../App';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      showing: 'bucketlists',
      message: 'Processing...',
      bucketlists: [],
      selectedBucketlist: null,
      items: [],
    };
    if (this.state.token) {
      this.request('getBucketlists', 'bucketlists', 'GET');
    }
  }

  viewItems = (selectedBucketlist) => {
    this.setState({
      showing: 'items',
      selectedBucketlist,
    });
    this.request('getItems', `bucketlists/${selectedBucketlist.id}/items`, 'GET');
  }

  viewBucketlists = () => {
    this.request('getBucketlists', 'bucketlists', 'GET');
    this.setState({
      showing: 'bucketlists',
      items: null,
      selectedBucketlist: null,
    });
  }

  search = (searchTerm) => {
    if (this.state.showing === 'bucketlists') {
      if (searchTerm !== '') {
        this.request('getBucketlists', `bucketlists?q=${searchTerm}`, 'GET');
      } else {
        this.request('getBucketlists', 'bucketlists', 'GET');
      }
    } else {
      if (searchTerm !== '') {
        this.request('getItems', `bucketlists/${this.state.selectedBucketlist.id}/items?q=${searchTerm}`, 'GET');
      } else {
        this.request('getItems', `bucketlists/${this.state.selectedBucketlist.id}/items`, 'GET');
      }
    }
  }

  request = (action, urlEndPoint, requestMethod, requestBody) => {
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
              token: null,
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
          let updateBucketlists = null;
          if (this.state.bucketlists != null) {
            updateBucketlists = this.state.bucketlists.slice();
          }
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
        } else if (action === 'logoutUser') {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.setState({
            message: 'You have successfully logged out.',
            token: null,
          });
        } else if (action === 'getItems') {
          if (data.items) {
            this.setState({
              message: null,
              items: data.items,
            });
          } else {
            this.setState({
              message: "You don't have any items in this bucketlist. Use the above button to add some.",
              items: [],
            });
          }
        } else if (action === 'addItem') {
          let updatedItems = null;
          if (this.state.items != null) {
            updatedItems = this.state.items.slice();
          }
          updatedItems.push(data.item);
          this.setState({
            items: updatedItems,
            message: 'Item successfully added.',
          });
        } else if (action === 'updateItem') {
          const itemsCopy = this.state.items.slice();
          const updatedItems = itemsCopy.filter(item => (
            item.id !== requestBody.id
          ));
          updatedItems.push(data.item);
          this.setState({
            message: 'Item successfully updated.',
            items: updatedItems,
          });
        } else if (action === 'deleteItem') {
          const itemsCopy = this.state.items.slice();
          const updatedItems = itemsCopy.filter(item => (
            item.id !== parseInt(urlEndPoint.substring(urlEndPoint.lastIndexOf('/') + 1), 10)
          ));
          this.setState({
            message: 'Item successfully deleted.',
            items: updatedItems,
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
        <div className="custom-navbar bg-cool-blue">
          <NavBar
            request={this.request}
            viewBucketlists={this.viewBucketlists}
            search={this.search}
          />
        </div>
        {
          this.state != null && this.state.message &&
            <Message
              message={this.state.message}
            />
        }
        {this.state.showing === 'bucketlists' ?
          <Bucketlists
            bucketlists={this.state.bucketlists}
            request={this.request}
            viewItems={this.viewItems}
          /> :
          <Items
            selectedBucketlist={this.state.selectedBucketlist}
            items={this.state.items}
            request={this.request}
            viewBucketlists={this.viewBucketlists}
          />
        }
      </div>
    );
  }
}
