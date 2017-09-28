import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../components/authentication/login';

const props = {
  location: {
    data: {
      message: 'Test message',
    },
  },
};

global.localStorage = {
  setItem: () => {},
  getItem: () => {},
};

it('renders correctly', () => {
  const login = renderer.create(<Login {...props} />).toJSON();
  expect(login).toMatchSnapshot();
});
