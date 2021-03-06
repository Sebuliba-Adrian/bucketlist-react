import React from 'react';

export default function ConfirmDelete(props) {
  function deleteAction(event) {
    if (props.theId.indexOf('deleteBucketModel') > -1) {
      props.request('deleteBucketlist', `bucketlists/${props.bucketlist.id}`, 'DELETE');
    } else {
      props.request('deleteItem', `bucketlists/${props.selectedBucketlist.id}/items/${props.item.id}`, 'DELETE');
    }
  }
  return (
    <div className="modal fade" id={props.theId} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete?
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
              onClick={deleteAction}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
