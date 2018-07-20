import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Footer from '../../../../src/components/footer/footer.js'

Enzyme.configure({adapter: new Adapter()});

describe('footer tests', () => {
  test('render footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toHaveLength(1);
  });
});
