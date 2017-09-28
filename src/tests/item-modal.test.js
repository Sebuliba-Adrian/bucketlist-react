import React from 'react';
import renderer from 'react-test-renderer';
import ItemModal from '../components/items/item-modal';


const props = {
  theId: 1,
  title: 'Create item',
  action: 'Create',
  selectedBucketlist: {
    id: 1,
    title: 'Selected Bucketlist',
    description: 'This is the selected bucketlist',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  item: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    status: false,
  },
  request: jest.fn(),
};
it('renders correctly', () => {
  const itemModal = renderer.create(<ItemModal {...props} />).toJSON();
  expect(itemModal).toMatchSnapshot();
});
