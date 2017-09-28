import React from 'react';
import renderer from 'react-test-renderer';
import PageNotFound from '../components/page-not-found';

it('renders correctly', () => {
  const pageNotFound = renderer.create(<PageNotFound />).toJSON();
  expect(pageNotFound).toMatchSnapshot();
});
