import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Rotator from '../../../../src/components/rotator/rotator.js'

import createStore from '../../../../src/store/';
//const store = createStore();
function testFunction () {
  console.log(`called by ${this}`);
}
let store ={
  subscribe: testFunction,
  dispatch: testFunction,
  getState: testFunction,
  reducers: {},
};


Enzyme.configure({adapter: new Adapter()});

describe('rotator tests', () => {

  test('rendering rotator has a assignments and challenge props', () => {
    const wrapper = shallow(<Provider store={store}><Rotator assignemnt={{}} challenges={{}} /></Provider>);
    let wrapProps = wrapper.props()
    expect(Object.keys(wrapProps).length).toEqual(2);
  })

  test('rendering rotator has a correct className', () => {
    const wrapper = shallow(<Provider store={store}><Rotator assignemnt={{}} challenges={{}} /></Provider>);
    expect(wrapper.hasClass('rotator'));
  })

});
