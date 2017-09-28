import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../components/dashboard';

global.localStorage = {
  setItem: () => {},
  getItem: () => {},
};

it('renders correctly', () => {
  const dashboard = renderer.create(<Dashboard />).toJSON();
  expect(dashboard).toMatchSnapshot();
});
