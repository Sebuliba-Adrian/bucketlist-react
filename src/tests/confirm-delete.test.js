import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmDelete from '../components/confirm-delete';

const props = {
  theId: 1,
  bucketlist: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  selectedBucketlist: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  item: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    status: true,
  },
  request: jest.fn(),
  viewItems: jest.fn(),
};
it('renders correctly', () => {
  const confirmDelete = renderer.create(<ConfirmDelete {...props} />).toJSON();
  expect(confirmDelete).toMatchSnapshot();
});
