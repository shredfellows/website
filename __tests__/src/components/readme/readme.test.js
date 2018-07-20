import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Readme from '../../../../src/components/readme/readme.js'


Enzyme.configure({adapter: new Adapter()});

describe('readme tests', () => {
  test('testing readme initial state', () => {
  //  const wrapper = shallow(<Readme />)
    let mountedReadMe = Enzyme.mount(<Readme />)

    const expected = {content: ''};
    expect(mountedReadMe.state()).toEqual(expected)
  })

  test(`does the readme component have the "readme" class`, () => {
     const wrapper = shallow(<Readme />);
     expect(wrapper.hasClass('readme'));
   });
});
