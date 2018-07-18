import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

import App from '../../../src/App.js';

describe('<App /> (Enzyme Test)', () => {

  it('it renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<App /> (Snapshot Test)', () => {

  it('renders cleanly', () => {
    const component = renderer.create(
      <App/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
