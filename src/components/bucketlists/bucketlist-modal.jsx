import React, { Component } from 'react';

export default class BucketlistModal extends Component {
  constructor(props) {
    super(props);
    if (props.bucketlist) {
      this.state = props.bucketlist;
    } else {
      this.state = {
        title: '',
        description: '',
      };
    }
  }

  onInputChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
    });
  }

  submitData = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.theId === 'addBucketlistModal') {
      this.props.request('addBucketlist', 'bucketlists', 'POST', this.state);
    } else {
      this.props.request('updateBucketlist', `bucketlists/${this.state.id}`, 'PUT', this.state);
    }
    this.resetState();
  }

  render() {
    return (
      <div className="modal fade" id={this.props.theId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="tiltle">Title</label>
              <div className="input-group" onChange={this.onInputChange}>
                <input
                  type="text"
                  className="form-control"
                  id="tiltle"
                  name="title"
                  onChange={this.onInputChange}
                  value={this.state.title}
                />
              </div>
              <br />
              <label htmlFor="description" >Description</label>
              <div className="input-group">
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.onInputChange}
                  value={this.state.description}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.submitData}
              >
                {this.props.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
