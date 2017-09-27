import React from 'react';
import ItemModal from './item-modal';
import Item from './item';

export default function Items(props) {
  return (
    <div>
      <div className="container items-container">
        <div className="card mt-3 mb-3">
          <div className="card-block">
            <div className="d-flex w-100 justify-content-between mb-2">
              <h5></h5>
              <button
                className="btn btn-sm btn-cool-blue col-xs-12"
                data-toggle="modal"
                data-target="#addItemModal"
              ><span className="fa fa-plus pull-left" /> Add Item
              </button>
            </div>
            <nav className="ml-4">
              <ul className="pagination pagination-sm">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
            {
              !props.items ? 
                <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">Select a bucketlist to view it's items</h6> :
              props.items.length === 0 ?
                <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">No items in {props.selectedBucketlist.title}</h6> :
                <div>
                  <h6 className="card-text ml-4 pb-2 text-center text-cool-blue">Items in {props.selectedBucketlist.title}</h6>
                  <ul className="list-group list-group-flush">
                    {
                      props.items.map(item =>
                        (<Item
                          key={item.id}
                          item={item}
                          request={props.request}
                          selectedBucketlist={props.selectedBucketlist}
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
      <ItemModal
        title="Create an item"
        action="Submit"
        theId="addItemModal"
        request={props.request}
        selectedBucketlist={props.selectedBucketlist}
      />
    </div>
  );
}
