import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ItemModal from '../components/items/item-modal';


const props = {
  theId: 'addItemModal',
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

describe('Item modal tests', () => {
  configure({ adapter: new Adapter() });
  const itemMod = mount(<ItemModal {...props} />);
  const instance = itemMod.instance();

  it('renders correctly', () => {
    const itemModal = renderer.create(<ItemModal {...props} />).toJSON();
    expect(itemModal).toMatchSnapshot();
  });

  it('Updates title in state on change', () => {
    const title = itemMod.find("[type='text']").at(0);
    title.simulate('change', {
      target: {
        name: 'title',
        value: 'Test item',
      },
    });
    expect(itemMod.state().title).toEqual('Test item');
    const status = itemMod.find('select');
    status.simulate('change', {
      target: {
        name: 'status',
        value: '1',
      },
    });
    expect(itemMod.state().status).toEqual('True');
    status.simulate('change', {
      target: {
        name: 'status',
        value: '0',
      },
    });
    expect(itemMod.state().status).toEqual('False');
  });
  it('submits item details', () => {
    const button = itemMod.find('button').at(2);
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
    itemMod.setProps({ theId: 'updateItem' });
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
  });

});
