import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/authentication/footer';

const props = {
  message: 'success',
  link: '/login',
  linkText: 'login',
};

it('renders correctly', () => {
  const footer = renderer.create(<Footer {...props} />).toJSON();
  expect(footer).toMatchSnapshot();
});
