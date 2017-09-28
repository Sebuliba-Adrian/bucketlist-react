import React, { Component } from 'react';

export default class ItemModal extends Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = props.item
    } else {
      this.state = {
        title: '',
        description: '',
        status: '',
      };
    }
    this.defaultState = this.state;
  }

  onInputChange = ({ target }) => {
    let { value } = target;
    if (target.name === 'status') {
      value = value === '1' ? 'True' : 'False';
    }
    this.setState({
      [target.name]: value,
    });
  }

  submitData = (event) => {
    if (this.props.theId === 'addItemModal') {
      this.props.request('addItem', `bucketlists/${this.props.selectedBucketlist.id}/items`, 'POST', this.state);
    } else {
      this.state["new_status"] = this.state.status; // hack
      this.props.request('updateItem', `bucketlists/${this.props.selectedBucketlist.id}/items/${this.state.id}`, 'PUT', this.state);
    }
    event.stopPropagation();
    this.resetState(event);
  }
  resetState = (event) => {
    event.stopPropagation();
    this.setState(this.defaultState);
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
              <br />
              { this.state.status !== '' &&
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  className="form-control"
                  id="status"
                  value={this.state.status ? '1' : '0'}
                  onChange={this.onInputChange}
                >
                  <option value="1">Finished</option>
                  <option value="0">Pending</option>
                </select>
              </div>
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.resetState}
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
