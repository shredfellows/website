import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Header from '../../../../src/components/header/header.js'

import { Provider } from 'react-redux';
import createStore from '../../../../src/store/';
const store = createStore();


Enzyme.configure({adapter: new Adapter()});

 describe('header tests', () => {
  test('render header', () => {
    const wrapper = shallow(<Header />);
     expect(wrapper).toHaveLength(1);
  });

  test(`does the header component have the "header" class`, () => {
     const wrapper = shallow(
     <Provider store={store}>
        <Header/>
     </Provider>);
      expect(wrapper.hasClass('header'));
   });

});
