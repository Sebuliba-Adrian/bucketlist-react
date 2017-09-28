import React from 'react';
import renderer from 'react-test-renderer';
import DateDisplay from '../components/date-display';

const props = {
  date: 'Wed, 20 Sep 2017 11:31:50 GMT',
};

it('renders correctly', () => {
  const dateDisplay = renderer.create(<DateDisplay {...props} />).toJSON();
  expect(dateDisplay).toMatchSnapshot();
});
