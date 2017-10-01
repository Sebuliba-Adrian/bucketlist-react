import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Dashboard from '../components/dashboard';

global.localStorage = {
  setItem: () => {},
  removeItem: () => {},
  getItem: () => 't0k3n',
};
const props = {
  history: {
    replace: jest.fn(),
  },
};

jest.useFakeTimers();

describe('Dashboard tests', () => {
  configure({ adapter: new Adapter() });
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
  const dashboard = mount(<Dashboard {...props} />);
  const instance = dashboard.instance();
  it('renders correctly', () => {
    const dashbrd = renderer.create(<Dashboard {...props} />).toJSON();
  expect(dashbrd).toMatchSnapshot();
  });

  it('shows bucketlists', () => {
    expect(global.fetch).toHaveBeenCalled();
  });

  it('shows items', () => {
    instance.viewItems({
      id: 1,
      title: 'Selected Bucketlist',
      description: 'This is the selected bucketlist',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    },
    );
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Test viewBucketlists', () => {
    instance.viewBucketlists();
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for buckets with b:', () => {
    instance.search('b:mybucket');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for buckets with B:', () => {
    instance.search('b:mybucket');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for items with i:', () => {
    instance.search('i:myitem');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for items with I:', () => {
    instance.search('I:myitem');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches items and buckets for blank search terms', () => {
    instance.search('');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('deletes token when expired', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Error',
            message: 'Token expired',
          },
        ),
      });
    });
    instance.request().then(()=>{
      expect(instance.state.token).toEqual(null);
    });
  });
  it('Updates state with error message', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Error',
            message: 'Buckets not found',
          },
        ),
      });
    });
    instance.request().then(()=>{
      expect(instance.state.message).toEqual('Buckets not found');
    });
  });
  it('Adds new bucketlist to state', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Bucket added',
            bucketlist: {
              id: 2,
              title: 'New Bucket',
              description: 'This is a new bucket',
              created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
              updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
            },
          },
        ),
      });
    });
    instance.state.bucketlists = [
      {
        id: 1,
        title: 'Test Bucket',
        description: 'This is a test bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      },
    ];
    instance.request('addBucketlist').then(()=>{
      expect(instance.state.bucketlists.length).toEqual(2);
    });
  });
  it('Updates a bucketlist', async () => {
    const modifiedBucketlist = {
      id: 2,
      title: 'Updated Bucket',
      description: 'This is the updated bucket',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    };
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Bucket updated',
            bucketlist: modifiedBucketlist,
          },
        ),
      });
    });
    instance.state.bucketlists = [
      {
        id: 1,
        title: 'Test Bucket',
        description: 'This is a test bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      },
      {
        id: 2,
        title: 'Test Bucket 2',
        description: 'This is the second bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      },
    ];
    instance.request('updateBucketlist', '', '', modifiedBucketlist).then(()=>{
      expect(instance.state.message).toEqual('Bucketlist successfully updated.');
    });
  });
  it('Delete a bucketlist', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Bucket deleted',
          },
        ),
      });
    });
    instance.state.bucketlists = [
      {
        id: 1,
        title: 'Test Bucket',
        description: 'This is a test bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      },
      {
        id: 2,
        title: 'Test Bucket 2',
        description: 'This is the second bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      },
    ];
    instance.request('deleteBucketlist', 'bucketlists/1', '').then(()=>{
      expect(instance.state.bucketlists.length).toEqual(1);
    });
  });
  it('It logs out user', () => {
    instance.request('logoutUser').then(() => {
      expect(instance.state.token).toEqual(null);
    })
  });
  it('Adds new item', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Item added',
            item: {
              id: 2,
              title: 'New Item',
              description: 'This is a new item',
              created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
              updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
              status: false,
            },
          },
        ),
      });
    });
    instance.state.items = [
      {
        id: 1,
        title: 'Test item',
        description: 'This is a test item',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        status: false,
      },
    ];
    instance.request('addItem').then(()=>{
      expect(instance.state.items.length).toEqual(2);
    });
  });
  it('Updates an item', async () => {
    const modifiedItem = {
      id: 2,
      title: 'Updated item',
      description: 'This is the updated item',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      status: false,
    };
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Item updated',
            item: modifiedItem,
          },
        ),
      });
    });
    instance.state.items = [
      {
        id: 1,
        title: 'Test Item',
        description: 'This is a test item',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        status: false,
      },
      {
        id: 2,
        title: 'Test Bucket 2',
        description: 'This is the second bucket',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        status: true,
      },
    ];
    instance.request('updateItem', '', '', modifiedItem).then(()=>{
      expect(instance.state.message).toEqual('Item successfully updated.');
    });
  });
  it('Delete an item', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(
          {
            status: 'Success',
            message: 'Item deleted',
          },
        ),
      });
    });
    instance.state.items = [
      {
        id: 1,
        title: 'Test Item',
        description: 'This is a test item',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        status: false,
      },
      {
        id: 2,
        title: 'Test Item 2',
        description: 'This is the second item',
        created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
        status: false,
      },
    ];
    instance.request('deleteItem', 'bucketlists/1/items/1', '').then(()=>{
      expect(instance.state.items.length).toEqual(1);
    });
  });
});
