import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Home from '../../../../src/components/pages/home.js'

Enzyme.configure({adapter: new Adapter()});

describe('Home tests', () => {
  test('render home', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.hasClass('home'));
  });
});
