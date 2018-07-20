import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Output from '../../../../src/components/output/output.js'

Enzyme.configure({adapter: new Adapter()});

describe('output tests', () => {

  test('render output', () => {
    const wrapper = shallow(<Output output={null}/>);
    expect(wrapper).toHaveLength(1);

  test(`does the output component have the "output" class`, () => {
     const wrapper = shallow(<Output output={null} />);
     expect(wrapper.hasClass('output'));
   });
  });
});
