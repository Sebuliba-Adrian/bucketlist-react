import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConfirmDelete from '../components/confirm-delete';

const props = {
  theId: 'deleteBucketModel1',
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

describe('Confirm delete tests', () => {
  configure({ adapter: new Adapter() });
  const confirmDel = mount(<ConfirmDelete {...props} />);
  const instance = confirmDel.instance();

  it('renders correctly', () => {
    const confirmDelete = renderer.create(<ConfirmDelete {...props} />).toJSON();
    expect(confirmDelete).toMatchSnapshot();
  });

  it('Triggers delete', () => {
    const button = confirmDel.find('button').at(2);
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
    confirmDel.setProps({ theId: 'deleteItemModel1' });
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
  });
});
