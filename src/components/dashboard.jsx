import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './navbar';
import Bucketlists from './bucketlists/bucketlists';
import Items from './items/items';
import { APIUrl } from '../App';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.previousMessage = '';
    this.state = {
      token: localStorage.getItem('token'),
      showing: 'bucketlists',
      message: 'Processing...',
      bucketlists: [],
      selectedBucketlist: {},
      items: null,
    };
    if (this.state.token) {
      this.request('getBucketlists', 'bucketlists', 'GET');
    }
  }

  viewItems = (selectedBucketlist) => {
    this.setState({
      showing: 'items',
      message: '',
      selectedBucketlist,
    });
    this.request('getItems', `bucketlists/${selectedBucketlist.id}/items`, 'GET');
  }

  viewBucketlists = () => {
    this.request('getBucketlists', 'bucketlists', 'GET');
    this.setState({
      showing: 'bucketlists',
      items: [],
      selectedBucketlist: {},
    });
  }

  search = (searchTerm) => {
    if(searchTerm.length > 2){
    if (searchTerm.substring(0, 2) === 'b:') {
      this.request('getBucketlists', `bucketlists?q=${searchTerm.substring(2)}`, 'GET');
    } else if (searchTerm.substring(0, 2) === 'i:') {
      this.request('getItems', `bucketlists/${this.state.selectedBucketlist.id}/items?q=${searchTerm.substring(2)}`, 'GET');
    }
    } else {
      this.request('getBucketlists', 'bucketlists', 'GET');
      this.request('getItems', `bucketlists/${this.state.selectedBucketlist.id}/items`, 'GET');
    }
  
  }
  componentDidUpdate() {
    if (this.state.message !== '' && this.state.token && this.previousMessage !== this.state.message) {
      this.previousMessage = this.state.message;
      this.snackbar.className = 'show';
      this.snackbar.innerHTML = this.state.message;
      setTimeout(() => { this.snackbar.className = this.snackbar.className.replace('show', ''); }, 3000);
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
              items: [],
            });
          }
        } else if (action === 'getBucketlists') {
          if (data.bucketlists) {
            this.setState({
              message: '',
              bucketlists: data.bucketlists,
            });
          } else {
            this.setState({
              message: "You don't have any bucketlists. Use the button below to add some.",
              bucketlists: [],
            });
          }
        } else if (action === 'addBucketlist') {
          let updateBucketlists = [];
          if (this.state.bucketlists.length > 0) {
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
              message: '',
              items: data.items,
            });
          } else {
            this.setState({
              message: "You don't have any items in this bucketlist. Use the button below to add some.",
              items: [],
            });
          }
        } else if (action === 'addItem') {
          let updatedItems = [];
          if (this.state.items.length > 0) {
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
        {//this.state.showing === 'bucketlists' ?
        }
        <div className="row">
          <div className="col-4 bucketlists">
          <Bucketlists
            bucketlists={this.state.bucketlists}
            request={this.request}
            viewItems={this.viewItems}
          /> 
          </div>
          <div className="col-8 items">
          <Items
            selectedBucketlist={this.state.selectedBucketlist}
            items={this.state.items}
            request={this.request}
            viewBucketlists={this.viewBucketlists}
          />
          </div>
        </div>
        <div id="snackbar" ref={(snackbar) => { this.snackbar = snackbar; }} />
      </div>
    );
  }
}
