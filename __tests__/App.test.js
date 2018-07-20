import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import App from '../src/App.js'

import createStore from '../src/store/';
const store = createStore();

Enzyme.configure({adapter: new Adapter()});

describe('App tests', () => {
  test('testing App initial state', async done => {

    let mountedApp = Enzyme.mount(<App />)
    const expected = {loading:true};
    setImmediate(() => {
      expect(mountedApp.state()).toEqual(expected);
      done();
    });

  })

  test(`does the App component have children`, () => {
     const wrapper = shallow(<App />);
     let wrapProps = wrapper.props()
     let testVar = wrapProps.children.props.children.length;
     expect(testVar).toEqual(2);
   });

});
