import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistModal from '../components/bucketlists/bucketlist-modal';


const props = {
  theId: 1,
  bucketlist: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  request: jest.fn(),
};
it('renders correctly', () => {
  const bucketlistModal = renderer.create(<BucketlistModal {...props} />).toJSON();
  expect(bucketlistModal).toMatchSnapshot();
});
